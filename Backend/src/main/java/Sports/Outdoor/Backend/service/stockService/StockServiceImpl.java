package Sports.Outdoor.Backend.service.stockService;

import Sports.Outdoor.Backend.dto.request.StockRequestDto;
import Sports.Outdoor.Backend.dto.response.StockResponseDto;
import Sports.Outdoor.Backend.entity.ProductVariant;
import Sports.Outdoor.Backend.entity.Stock;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.ProductVariantRepository;
import Sports.Outdoor.Backend.repository.StockRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ModelMapper modelMapper;
    @Override
    public StockResponseDto create(StockRequestDto dto) {
        if (stockRepository.existsByVariantId(dto.getVariantId())){
            throw new BusinessExcepiton("Bu varyantın stok bilgileri zaten mevcut.");
        }
        ProductVariant productVariant=productVariantRepository.findById(dto.getVariantId()).orElse(null);
        if(productVariant==null){
            throw new NotFoundException("Variant Mevcut Değildir");
        }
        Stock stock=new Stock();
        stock.setQuantity(dto.getQuantity());
        stock.setVariant(productVariant);
        stockRepository.save(stock);
        StockResponseDto stockResponseDto=modelMapper.map(stock,StockResponseDto.class);
        stockResponseDto.setSku(stock.getVariant().getSku());
        stockResponseDto.setColor(stock.getVariant().getColor());
        stockResponseDto.setSize(stock.getVariant().getSize());
        return stockResponseDto;

    }

    @Override
    public StockResponseDto getById(Long id) {
        Stock stock=stockRepository.findById(id).orElse(null);
        if(stock==null){
            throw new NotFoundException("Kayıt bulunamadı");
        }
        StockResponseDto stockResponseDto=modelMapper.map(stock,StockResponseDto.class);
        stockResponseDto.setSku(stock.getVariant().getSku());
        stockResponseDto.setColor(stock.getVariant().getColor());
        stockResponseDto.setSize(stock.getVariant().getSize());
        return stockResponseDto;
    }

    @Override
    public List<StockResponseDto> getAll() {
        List<Stock>stocks=stockRepository.findAll();
        List<StockResponseDto>stockResponseDtos=stocks.stream().map(stock -> {
            StockResponseDto stockResponseDto=new StockResponseDto();
            stockResponseDto.setId(stock.getId());
            stockResponseDto.setQuantity(stock.getQuantity());
            stockResponseDto.setVariantId(stock.getVariant().getId());
            stockResponseDto.setSku(stock.getVariant().getSku());
            stockResponseDto.setColor(stock.getVariant().getColor());
            stockResponseDto.setSize(stock.getVariant().getSize());
            return stockResponseDto;
        }).collect(Collectors.toList());
        return stockResponseDtos;
    }

    @Override
    public StockResponseDto update(Long id, StockRequestDto dto) {
        ProductVariant productVariant=productVariantRepository.findById(dto.getVariantId()).orElse(null);
        if(productVariant==null){
            throw new NotFoundException("Variant Bulunamadı");
        }
        Stock stock=stockRepository.findById(id).orElse(null);
        if(stock==null){
            throw new NotFoundException("Güncellenicek Veri Bulunamadı");
        }
        stock.setQuantity(dto.getQuantity());
        stock.setVariant(productVariant);
        stockRepository.save(stock);

        StockResponseDto stockResponseDto=modelMapper.map(stock,StockResponseDto.class);
        stockResponseDto.setSku(stock.getVariant().getSku());
        stockResponseDto.setColor(stock.getVariant().getColor());
        stockResponseDto.setSize(stock.getVariant().getSize());
        return stockResponseDto;

    }

    @Override
    public boolean delete(Long id) {
        Stock stock=stockRepository.findById(id).orElse(null);
        if(stock==null){
            throw new NotFoundException("Veri Bulunamadı");
        }
        stockRepository.deleteById(id);
        if(!stockRepository.existsById(id)){
            return true;
        }
        return false;
    }
}
