package Sports.Outdoor.Backend.service.productVariantService;

import Sports.Outdoor.Backend.dto.request.ProductVariantRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductVariantResponseDto;
import Sports.Outdoor.Backend.entity.Product;
import Sports.Outdoor.Backend.entity.ProductVariant;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.ProductRepository;
import Sports.Outdoor.Backend.repository.ProductVariantRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService{
    private final ProductVariantRepository productVariantRepository;

    private final ProductRepository productRepository;

    private final ModelMapper modelMapper;
    @Override
    public ProductVariantResponseDto create(ProductVariantRequestDto dto) {
        Product product=productRepository.findById(dto.getProductId()).orElse(null);
        if(product==null){
            throw new NotFoundException("Product Bulunamadı");
        }
        ProductVariant variant=new ProductVariant();
        variant.setColor(dto.getColor());
        variant.setSize(dto.getSize());
        variant.setSku(dto.getSku());
        variant.setProduct(product);
        productVariantRepository.save(variant);
        ProductVariantResponseDto productVariant=modelMapper.map(variant,ProductVariantResponseDto.class);
        return productVariant;
    }

    @Override
    public ProductVariantResponseDto getById(Long id) {
        ProductVariant variant=productVariantRepository.findById(id).orElse(null);
        if(variant==null){
            throw new NotFoundException("Product Variant Bulunamadı");
        }
        ProductVariantResponseDto productVariantResponseDto=modelMapper.map(variant,ProductVariantResponseDto.class);
        return productVariantResponseDto;
    }

    @Override
    public List<ProductVariantResponseDto> getAll() {
        List<ProductVariant>productVariantList=productVariantRepository.findAll();
        List<ProductVariantResponseDto>productVariantResponseDtos=productVariantList.stream().map(productVariant -> modelMapper.map(productVariant,ProductVariantResponseDto.class)).collect(Collectors.toList());
        return productVariantResponseDtos;
    }

    @Override
    public ProductVariantResponseDto update(Long id, ProductVariantRequestDto dto) {
        Product product=productRepository.findById(dto.getProductId()).orElse(null);
        if(product==null){
            throw new NotFoundException("Product Bulunamadı");
        }
        ProductVariant variant=productVariantRepository.findById(id).orElse(null);
        if(variant==null){
            throw new NotFoundException("Güncellemek istediğiniz veri bulunamadı");
        }
        variant.setColor(dto.getColor());
        variant.setSize(dto.getSize());
        variant.setSku(dto.getSku());
        variant.setProduct(product);
        productVariantRepository.save(variant);
        ProductVariantResponseDto productVariantResponseDto=modelMapper.map(variant,ProductVariantResponseDto.class);
        return productVariantResponseDto;
    }

    @Override
    public boolean delete(Long id) {
        ProductVariant productVariant=productVariantRepository.findById(id).orElse(null);
        if(productVariant==null){
            throw  new NotFoundException("Product Variant Bulunamadı");
        }
        productVariantRepository.deleteById(id);
        if(!productVariantRepository.existsById(id)){
            return true;
        }
        return false;
    }
}
