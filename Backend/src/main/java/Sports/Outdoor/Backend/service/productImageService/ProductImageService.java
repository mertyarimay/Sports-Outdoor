package Sports.Outdoor.Backend.service.productImageService;

import Sports.Outdoor.Backend.dto.request.ProductImageRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductImageResponseDto;

import java.util.List;

public interface ProductImageService {
    ProductImageResponseDto create(ProductImageRequestDto dto);

    ProductImageResponseDto getById(Long id);

    List<ProductImageResponseDto> getAll();

    ProductImageResponseDto update(Long id, ProductImageRequestDto dto);

    boolean delete(Long id);
}
