package Sports.Outdoor.Backend.service.productService;

import Sports.Outdoor.Backend.dto.request.ProductRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductResponseDto;

import java.util.List;

public interface ProductService {
    ProductResponseDto create(ProductRequestDto dto);

    ProductResponseDto getById(Long id);

    List<ProductResponseDto> getAll();

    ProductResponseDto update(Long id, ProductRequestDto dto);

    Boolean delete(Long id);
}
