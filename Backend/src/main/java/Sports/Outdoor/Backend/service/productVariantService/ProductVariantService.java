package Sports.Outdoor.Backend.service.productVariantService;

import Sports.Outdoor.Backend.dto.request.ProductVariantRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductVariantResponseDto;

import java.util.List;

public interface ProductVariantService {
    ProductVariantResponseDto create(ProductVariantRequestDto dto);

    ProductVariantResponseDto getById(Long id);

    List<ProductVariantResponseDto> getAll();

    List<ProductVariantResponseDto> getByProductId(Long productId);

    ProductVariantResponseDto update(Long id, ProductVariantRequestDto dto);

    boolean delete(Long id);
}
