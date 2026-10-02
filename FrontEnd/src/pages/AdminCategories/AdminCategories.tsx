
import { useEffect, useRef, useState } from 'react'
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
    type Category,
    type CategoryRequest,
} from '../../api/categoryApi'

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([])

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [showForm, setShowForm] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [editingCategoryId, setEditingCategoryId] =
        useState<number | null>(null)

    const [form, setForm] = useState<CategoryRequest>({
        name: '',
        slug: '',
        parentId: null,
    })

    async function loadCategories() {
        try {
            setLoading(true)
            setError('')

            const data = await getCategories()

            setCategories(data)
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Kategoriler alınamadı',
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    function resetForm() {
        setForm({
            name: '',
            slug: '',
            parentId: null,
        })

        setEditingCategoryId(null)
    }

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >,
    ) {
        const { name, value } = e.target

        setForm((previous) => ({
            ...previous,
            [name]:
                name === 'parentId'
                    ? value === ''
                        ? null
                        : Number(value)
                    : value,
        }))
    }

    function handleNewCategory() {
        resetForm()

        setError('')
        setSuccess('')

        setShowForm(true)
    }

    function handleEdit(category: Category) {
        setForm({
            name: category.name,
            slug: category.slug,
            parentId: category.parentId,
        })

        setEditingCategoryId(category.id)

        setError('')
        setSuccess('')

        setShowForm(true)

        setTimeout(() => {
            formRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 100)
    }

    function handleCloseForm() {
        resetForm()

        setError('')
        setShowForm(false)
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault()

        setError('')
        setSuccess('')

        if (!form.name.trim()) {
            setError('Kategori adı zorunludur.')
            return
        }

        if (!form.slug.trim()) {
            setError('Kategori slug zorunludur.')
            return
        }

        if (
            editingCategoryId !== null &&
            form.parentId === editingCategoryId
        ) {
            setError(
                'Kategori kendisinin üst kategorisi olamaz.',
            )
            return
        }

        try {
            setSaving(true)

            if (editingCategoryId !== null) {
                const updatedCategory =
                    await updateCategory(
                        editingCategoryId,
                        form,
                    )

                setCategories((previous) =>
                    previous.map((category) =>
                        category.id ===
                        editingCategoryId
                            ? updatedCategory
                            : category,
                    ),
                )

                setSuccess(
                    'Kategori başarıyla güncellendi.',
                )
            } else {
                const createdCategory =
                    await createCategory(form)

                setCategories((previous) => [
                    ...previous,
                    createdCategory,
                ])

                setSuccess(
                    'Kategori başarıyla oluşturuldu.',
                )
            }

            resetForm()
            setShowForm(false)

            await loadCategories()
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Kategori işlemi başarısız.',
            )
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(
        category: Category,
    ) {
        const hasChildren = categories.some(
            (item) =>
                item.parentId === category.id,
        )

        if (hasChildren) {
            setError(
                'Bu kategorinin alt kategorileri var. Önce alt kategorileri silmelisin veya başka bir üst kategoriye taşımalısın.',
            )
            return
        }

        const confirmed = window.confirm(
            `"${category.name}" kategorisini silmek istediğinize emin misiniz?`,
        )

        if (!confirmed) {
            return
        }

        try {
            setDeletingId(category.id)

            setError('')
            setSuccess('')

            await deleteCategory(category.id)

            setCategories((previous) =>
                previous.filter(
                    (item) =>
                        item.id !== category.id,
                ),
            )

            setSuccess(
                `"${category.name}" kategorisi silindi.`,
            )
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Kategori silinemedi.',
            )
        } finally {
            setDeletingId(null)
        }
    }

    const parentCategories = categories.filter(
        (category) =>
            category.parentId === null,
    )

    function getSubCategories(parentId: number) {
        return categories.filter(
            (category) =>
                category.parentId === parentId,
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                Kategoriler yükleniyor...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Kategori Yönetimi
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Kategorileri ekle, düzenle ve yönet.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleNewCategory}
                        className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        + Yeni Kategori
                    </button>
                </div>

                {/* Success */}
                {success && (
                    <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Form */}
                {showForm && (
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingCategoryId !== null
                                    ? 'Kategori Düzenle'
                                    : 'Yeni Kategori'}
                            </h2>

                            <button
                                type="button"
                                onClick={handleCloseForm}
                                className="text-sm text-gray-500 hover:text-gray-900"
                            >
                                Kapat
                            </button>
                        </div>

                        <div className="mt-5 grid gap-5 md:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Kategori adı
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                                    placeholder="Örneğin: Kamp"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Slug
                                </label>

                                <input
                                    type="text"
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                                    placeholder="kamp"
                                />
                            </div>

                            {/* Parent */}
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Üst kategori
                                </label>

                                <select
                                    name="parentId"
                                    value={
                                        form.parentId ??
                                        ''
                                    }
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-black"
                                >
                                    <option value="">
                                        Ana kategori
                                    </option>

                                    {categories
                                        .filter(
                                            (
                                                category,
                                            ) =>
                                                category.id !==
                                                editingCategoryId,
                                        )
                                        .map(
                                            (
                                                category,
                                            ) => (
                                                <option
                                                    key={
                                                        category.id
                                                    }
                                                    value={
                                                        category.id
                                                    }
                                                >
                                                    {
                                                        category.parentId
                                                            ? '↳ '
                                                            : ''
                                                    }
                                                    {
                                                        category.name
                                                    }
                                                </option>
                                            ),
                                        )}
                                </select>

                                <p className="mt-2 text-xs text-gray-500">
                                    "Ana kategori" seçersen kategori
                                    üst kategori olmadan oluşturulur.
                                </p>
                            </div>
                        </div>

                        {/* Form Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCloseForm}
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Vazgeç
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving
                                    ? 'Kaydediliyor...'
                                    : editingCategoryId !== null
                                      ? 'Kategori Güncelle'
                                      : 'Kategori Ekle'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Categories */}
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="font-semibold text-gray-900">
                            Kategoriler ({categories.length})
                        </h2>
                    </div>

                    {categories.length === 0 ? (
                        <div className="p-6 text-sm text-gray-500">
                            Henüz kategori bulunmuyor.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">

                            {parentCategories.map(
                                (
                                    parentCategory,
                                ) => {
                                    const subCategories =
                                        getSubCategories(
                                            parentCategory.id,
                                        )

                                    return (
                                        <div
                                            key={
                                                parentCategory.id
                                            }
                                            className="p-6"
                                        >

                                            {/* Parent */}
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        {
                                                            parentCategory.name
                                                        }
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        /
                                                        {
                                                            parentCategory.slug
                                                        }
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                        Ana Kategori
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                parentCategory,
                                                            )
                                                        }
                                                        className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Düzenle
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            deletingId ===
                                                            parentCategory.id
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                parentCategory,
                                                            )
                                                        }
                                                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {deletingId ===
                                                        parentCategory.id
                                                            ? 'Siliniyor...'
                                                            : 'Sil'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Children */}
                                            {subCategories.length >
                                                0 && (
                                                <div className="mt-4 ml-6 space-y-2 border-l-2 border-gray-100 pl-5">
                                                    {subCategories.map(
                                                        (
                                                            subCategory,
                                                        ) => (
                                                            <div
                                                                key={
                                                                    subCategory.id
                                                                }
                                                                className="flex flex-col gap-3 rounded-lg bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                                            >
                                                                <div>
                                                                    <p className="font-medium text-gray-800">
                                                                        {
                                                                            subCategory.name
                                                                        }
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                        /
                                                                        {
                                                                            subCategory.slug
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs text-gray-400">
                                                                        Alt
                                                                        kategori
                                                                    </span>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                subCategory,
                                                                            )
                                                                        }
                                                                        className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-white"
                                                                    >
                                                                        Düzenle
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        disabled={
                                                                            deletingId ===
                                                                            subCategory.id
                                                                        }
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                subCategory,
                                                                            )
                                                                        }
                                                                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    >
                                                                        {deletingId ===
                                                                        subCategory.id
                                                                            ? 'Siliniyor...'
                                                                            : 'Sil'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                },
                            )}

                            {/* Orphan categories */}
                            {categories.some(
                                (category) =>
                                    category.parentId !==
                                        null &&
                                    !categories.some(
                                        (parent) =>
                                            parent.id ===
                                            category.parentId,
                                    ),
                            ) && (
                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-900">
                                        Diğer Kategoriler
                                    </h3>

                                    <div className="mt-3 space-y-2">
                                        {categories
                                            .filter(
                                                (
                                                    category,
                                                ) =>
                                                    category.parentId !==
                                                        null &&
                                                    !categories.some(
                                                        (
                                                            parent,
                                                        ) =>
                                                            parent.id ===
                                                            category.parentId,
                                                    ),
                                            )
                                            .map(
                                                (
                                                    category,
                                                ) => (
                                                    <div
                                                        key={
                                                            category.id
                                                        }
                                                        className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                                                    >
                                                        <span>
                                                            {
                                                                category.name
                                                            }
                                                        </span>

                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        category,
                                                                    )
                                                                }
                                                                className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold"
                                                            >
                                                                Düzenle
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        category,
                                                                    )
                                                                }
                                                                className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
                                                            >
                                                                Sil
                                                            </button>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

