package Sports.Outdoor.Backend.service.categoryService;

import Sports.Outdoor.Backend.dto.request.CategoryRequestDto;
import Sports.Outdoor.Backend.dto.response.CategoryResponseDto;
import Sports.Outdoor.Backend.entity.Category;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;
    @Override
    public CategoryResponseDto create(CategoryRequestDto dto) {
        Category category = modelMapper.map(dto, Category.class);
        if (dto.getParentId() != null) {

            Category parent =categoryRepository.findById(dto.getParentId()).orElse(null);
            if(parent!=null){
                category.setParent(parent);
            }
        }
        Category saved = categoryRepository.save(category);
        CategoryResponseDto categoryResponseDto=modelMapper.map(saved,CategoryResponseDto.class);
        return categoryResponseDto;
    }

    @Override
    public CategoryResponseDto getById(Long id) {

        Category category = categoryRepository.findById(id).orElse(null);
        if(category!=null){
            CategoryResponseDto categoryResponseDto=modelMapper.map(category,CategoryResponseDto.class);
            return categoryResponseDto;
        }
        throw new NotFoundException("Category Bulunamadı");
    }

    @Override
    public List<CategoryResponseDto> getAll() {
        List<Category>categoryList=categoryRepository.findAll();
        List<CategoryResponseDto>categoryResponseDtoList=categoryList.stream().map(category -> modelMapper.map(category,CategoryResponseDto.class)).collect(Collectors.toList());
        return categoryResponseDtoList;
    }

    @Override
    public CategoryResponseDto update(Long id, CategoryRequestDto dto) {
        Category category = categoryRepository.findById(id).orElse(null);
        if(category!=null){
            category.setName(dto.getName());
            category.setSlug(dto.getSlug());
        }
        Category updated = categoryRepository.save(category);
        CategoryResponseDto categoryResponseDto=modelMapper.map(updated,CategoryResponseDto.class);
        return categoryResponseDto;
    }

    @Override
    public Boolean delete(Long id) {
        Category category=categoryRepository.findById(id).orElse(null);
        if(category!=null){
            categoryRepository.deleteById(id);
            if(!categoryRepository.existsById(id)){
                return true;
            }
        }
        return false;

    }
}
