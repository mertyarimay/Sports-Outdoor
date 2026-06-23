package Sports.Outdoor.Backend.service.stockService;

import Sports.Outdoor.Backend.dto.request.StockRequestDto;
import Sports.Outdoor.Backend.dto.response.StockResponseDto;

import java.util.List;

public interface StockService {
    StockResponseDto create(StockRequestDto dto);

    StockResponseDto getById(Long id);

    List<StockResponseDto> getAll();

    StockResponseDto update(Long id, StockRequestDto dto);

    boolean delete(Long id);
}
