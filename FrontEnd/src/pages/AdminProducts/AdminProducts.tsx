
import { useEffect, useState } from 'react'
import {
    createProduct,
    getAllProductsForAdmin,
    updateProduct,
    type ProductRequest,
} from '../../api/productApi'

import {
    getCategories,
    type Category,
} from '../../api/categoryApi'

import {
    getBrands,
    type Brand,
} from '../../api/brandApi'

import {
    getCampaigns,
    type Campaign,
} from '../../api/campaignApi'

import type { Product } from '../../types/Product'

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrands] = useState<Brand[]>([])
    const [campaigns, setCampaigns] = useState<Campaign[]>([])

    const [showForm, setShowForm] = useState(false)
    const [editingProductId, setEditingProductId] =
        useState<number | null>(null)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [changingStatusId, setChangingStatusId] =
        useState<number | null>(null)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    const [form, setForm] = useState<ProductRequest>({
        name: '',
        slug: '',
        description: '',
        price: 0,
        discountPrice: null,
        active: true,
        gender: '',
        categoryId: 0,
        brandId: 0,
        campaignId: null,
    })

    useEffect(() => {
        async function loadData() {
            try {
                const productsData = await getAllProductsForAdmin()
                const categoriesData = await getCategories()
                const brandsData = await getBrands()
                const campaignsData = await getCampaigns()

                setProducts(productsData)
                setCategories(categoriesData)
                setBrands(brandsData)
                setCampaigns(campaignsData)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Veriler alınamadı',
                )
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    function resetForm() {
        setForm({
            name: '',
            slug: '',
            description: '',
            price: 0,
            discountPrice: null,
            active: true,
            gender: '',
            categoryId: 0,
            brandId: 0,
            campaignId: null,
        })

        setEditingProductId(null)
    }

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) {
        const { name, value } = e.target

        setForm((previous) => ({
            ...previous,
            [name]:
                name === 'price'
                    ? Number(value)
                    : name === 'discountPrice'
                      ? value === ''
                          ? null
                          : Number(value)
                      : name === 'categoryId'
                        ? Number(value)
                        : name === 'brandId'
                          ? Number(value)
                          : name === 'campaignId'
                            ? value === ''
                                ? null
                                : Number(value)
                            : value,
        }))
    }

    function handleEdit(product: Product) {
        const category = categories.find(
            (item) => item.name === product.categoryName,
        )

        const brand = brands.find(
            (item) => item.name === product.brandName,
        )

        const campaign = campaigns.find(
            (item) => item.title === product.campaignTitle,
        )

        setForm({
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            discountPrice: product.discountPrice,
            active: product.active,
            gender: product.gender,
            categoryId: category?.id ?? 0,
            brandId: brand?.id ?? 0,
            campaignId: campaign?.id ?? null,
        })

        setEditingProductId(product.id)
        setShowForm(true)

        setError('')
        setSuccess('')
    }

    async function handleToggleActive(product: Product) {
        const newActive = !product.active

        const confirmed = window.confirm(
            newActive
                ? `"${product.name}" ürününü tekrar aktif yapmak istiyor musunuz?`
                : `"${product.name}" ürününü pasif yapmak istiyor musunuz?`,
        )

        if (!confirmed) {
            return
        }

        try {
            setChangingStatusId(product.id)
            setError('')
            setSuccess('')

            const category = categories.find(
                (item) => item.name === product.categoryName,
            )

            const brand = brands.find(
                (item) => item.name === product.brandName,
            )

            const campaign = campaigns.find(
                (item) => item.title === product.campaignTitle,
            )

            if (!category) {
                throw new Error('Ürünün kategorisi bulunamadı.')
            }

            if (!brand) {
                throw new Error('Ürünün markası bulunamadı.')
            }

            const productRequest: ProductRequest = {
                name: product.name,
                slug: product.slug,
                description: product.description,
                price: product.price,
                discountPrice: product.discountPrice,
                active: newActive,
                gender: product.gender,
                categoryId: category.id,
                brandId: brand.id,
                campaignId: campaign?.id ?? null,
            }

            const updatedProduct = await updateProduct(
                product.id,
                productRequest,
            )

            setProducts((previous) =>
                previous.map((item) =>
                    item.id === product.id
                        ? updatedProduct
                        : item,
                ),
            )

            setSuccess(
                newActive
                    ? `"${product.name}" ürünü aktif edildi.`
                    : `"${product.name}" ürünü pasif edildi.`,
            )
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Ürün durumu değiştirilemedi.',
            )
        } finally {
            setChangingStatusId(null)
        }
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault()

        setError('')
        setSuccess('')

        if (
            !form.name.trim() ||
            !form.slug.trim() ||
            !form.description.trim()
        ) {
            setError('Lütfen zorunlu alanları doldurun.')
            return
        }

        if (form.price <= 0) {
            setError('Ürün fiyatı 0’dan büyük olmalıdır.')
            return
        }

        if (form.categoryId === 0) {
            setError('Kategori seçmelisin.')
            return
        }

        if (form.brandId === 0) {
            setError('Marka seçmelisin.')
            return
        }

        if (!form.gender) {
            setError('Cinsiyet seçmelisin.')
            return
        }

        try {
            setSaving(true)

            if (editingProductId !== null) {
                const updatedProduct = await updateProduct(
                    editingProductId,
                    form,
                )

                setProducts((previous) =>
                    previous.map((product) =>
                        product.id === editingProductId
                            ? updatedProduct
                            : product,
                    ),
                )

                setSuccess(
                    'Ürün başarıyla güncellendi.',
                )
            } else {
                const createdProduct =
                    await createProduct(form)

                setProducts((previous) => [
                    createdProduct,
                    ...previous,
                ])

                setSuccess(
                    'Ürün başarıyla oluşturuldu.',
                )
            }

            resetForm()
            setShowForm(false)
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'İşlem gerçekleştirilemedi',
            )
        } finally {
            setSaving(false)
        }
    }

    function handleNewProduct() {
        resetForm()
        setError('')
        setSuccess('')
        setShowForm(true)
    }

    function handleCloseForm() {
        resetForm()
        setError('')
        setShowForm(false)
    }

    if (loading) {
        return (
            <div className="p-6">
                Ürünler yükleniyor...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Ürün Yönetimi
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Ürünleri görüntüle, ekle ve düzenle.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleNewProduct}
                        className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        + Yeni Ürün Ekle
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

                {/* Product Form */}
                {showForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingProductId !== null
                                    ? 'Ürün Düzenle'
                                    : 'Yeni Ürün'}
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
                                    Ürün adı
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                                    placeholder="Nike Air Max"
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
                                    placeholder="nike-air-max"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Açıklama
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                                    placeholder="Ürün açıklaması..."
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Fiyat
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                                />
                            </div>

                            {/* Discount Price */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    İndirimli fiyat
                                </label>

                                <input
                                    type="number"
                                    name="discountPrice"
                                    min="0"
                                    step="0.01"
                                    value={form.discountPrice ?? ''}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                                    placeholder="Opsiyonel"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Cinsiyet
                                </label>

                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-black"
                                >
                                    <option value="">
                                        Seçiniz
                                    </option>

                                    <option value="MALE">
                                        Erkek
                                    </option>

                                    <option value="FEMALE">
                                        Kadın
                                    </option>

                                    <option value="UNISEX">
                                        Unisex
                                    </option>

                                    <option value="CHILD">
                                        Çocuk
                                    </option>
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Kategori
                                </label>

                                <select
                                    name="categoryId"
                                    value={form.categoryId}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-black"
                                >
                                    <option value={0}>
                                        Kategori seçiniz
                                    </option>

                                    {categories.map(
                                        (category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Marka
                                </label>

                                <select
                                    name="brandId"
                                    value={form.brandId}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-black"
                                >
                                    <option value={0}>
                                        Marka seçiniz
                                    </option>

                                    {brands.map((brand) => (
                                        <option
                                            key={brand.id}
                                            value={brand.id}
                                        >
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Campaign */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Kampanya
                                </label>

                                <select
                                    name="campaignId"
                                    value={form.campaignId ?? ''}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-black"
                                >
                                    <option value="">
                                        Kampanya yok
                                    </option>

                                    {campaigns.map(
                                        (campaign) => (
                                            <option
                                                key={campaign.id}
                                                value={campaign.id}
                                            >
                                                {campaign.title}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>

                            {/* Active */}
                            <div className="flex items-end">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={form.active}
                                        onChange={(e) =>
                                            setForm(
                                                (
                                                    previous,
                                                ) => ({
                                                    ...previous,
                                                    active: e
                                                        .target
                                                        .checked,
                                                }),
                                            )
                                        }
                                        className="h-4 w-4"
                                    />

                                    <span className="text-sm font-medium text-gray-700">
                                        Ürün aktif
                                    </span>
                                </label>
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
                                    : editingProductId !== null
                                      ? 'Ürünü Güncelle'
                                      : 'Ürünü Kaydet'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Product List */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="font-semibold text-gray-900">
                            Ürünler ({products.length})
                        </h2>
                    </div>

                    {products.length === 0 ? (
                        <div className="p-6 text-sm text-gray-500">
                            Henüz ürün bulunmuyor.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-700">
                                            ID
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700">
                                            Ürün
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700">
                                            Marka
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700">
                                            Kategori
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700">
                                            Fiyat
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700">
                                            Durum
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700">
                                            İşlem
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(
                                        (product) => (
                                            <tr
                                                key={product.id}
                                                className="border-t border-gray-100"
                                            >
                                                <td className="px-6 py-4">
                                                    {product.id}
                                                </td>

                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {product.name}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {
                                                        product.brandName
                                                    }
                                                </td>

                                                <td className="px-6 py-4">
                                                    {
                                                        product.categoryName
                                                    }
                                                </td>

                                                <td className="px-6 py-4">
                                                    {product.price}{' '}
                                                    ₺
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={
                                                            product.active
                                                                ? 'rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'
                                                                : 'rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600'
                                                        }
                                                    >
                                                        {product.active
                                                            ? 'Aktif'
                                                            : 'Pasif'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-2">

                                                        {/* Edit */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    product,
                                                                )
                                                            }
                                                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                                                        >
                                                            Düzenle
                                                        </button>

                                                        {/* Active / Passive */}
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                changingStatusId ===
                                                                product.id
                                                            }
                                                            onClick={() =>
                                                                handleToggleActive(
                                                                    product,
                                                                )
                                                            }
                                                            className={
                                                                product.active
                                                                    ? 'rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50'
                                                                    : 'rounded-lg border border-green-200 px-3 py-2 text-xs font-semibold text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50'
                                                            }
                                                        >
                                                            {changingStatusId ===
                                                            product.id
                                                                ? 'Güncelleniyor...'
                                                                : product.active
                                                                    ? 'Pasif Yap'
                                                                    : 'Aktif Yap'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                window.open(
                                                                    `/products/${product.slug}`,
                                                                    '_blank',
                                                                )
                                                            }
                                                            className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                                                        >
                                                            Detay
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

