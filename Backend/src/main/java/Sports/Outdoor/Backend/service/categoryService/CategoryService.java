package Sports.Outdoor.Backend.service.categoryService;

import Sports.Outdoor.Backend.dto.request.CategoryRequestDto;
import Sports.Outdoor.Backend.dto.response.CategoryResponseDto;

import java.util.List;

public interface CategoryService {
    CategoryResponseDto create(CategoryRequestDto dto);

    CategoryResponseDto getById(Long id);

    List<CategoryResponseDto> getAll();

    CategoryResponseDto update(Long id,CategoryRequestDto dto);

    Boolean delete(Long id);
}
