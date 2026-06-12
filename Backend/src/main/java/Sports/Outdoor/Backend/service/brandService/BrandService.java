package Sports.Outdoor.Backend.service.brandService;

import Sports.Outdoor.Backend.dto.request.BrandRequestDto;
import Sports.Outdoor.Backend.dto.response.BrandResponseDto;

import java.util.List;

public interface BrandService {
    BrandResponseDto create(BrandRequestDto dto);

    BrandResponseDto getById(Long id);

    List<BrandResponseDto> getAll();

    BrandResponseDto update(Long id, BrandRequestDto dto);

    Boolean delete(Long id);
}
