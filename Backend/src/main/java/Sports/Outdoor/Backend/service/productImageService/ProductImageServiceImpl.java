package Sports.Outdoor.Backend.service.productImageService;

import Sports.Outdoor.Backend.dto.request.ProductImageRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductImageResponseDto;
import Sports.Outdoor.Backend.dto.response.ProductVariantResponseDto;
import Sports.Outdoor.Backend.entity.Product;
import Sports.Outdoor.Backend.entity.ProductImage;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.ProductImageRepository;
import Sports.Outdoor.Backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductImageServiceImpl implements ProductImageService{
    private final ProductImageRepository productImageRepository;

    private final ProductRepository productRepository;

    private final ModelMapper modelMapper;
    @Override
    public ProductImageResponseDto create(ProductImageRequestDto dto) {
        Product product=productRepository.findById(dto.getProductId()).orElse(null);
        if(product==null){
            throw new NotFoundException("Product Bulunamadı");
        }
        ProductImage image=new ProductImage();
        image.setImageUrl(dto.getImageUrl());
        image.setMainImage(dto.getMainImage());
        image.setProduct(product);
        productImageRepository.save(image);

        ProductImageResponseDto productImageResponseDto=modelMapper.map(image,ProductImageResponseDto.class);
        return productImageResponseDto;
    }

    @Override
    public ProductImageResponseDto getById(Long id) {
        ProductImage productImage=productImageRepository.findById(id).orElse(null);
        if(productImage==null){
            throw new NotFoundException("Veri Bulunamadı");
        }
        ProductImageResponseDto productImageResponseDto=modelMapper.map(productImage,ProductImageResponseDto.class);
        return productImageResponseDto;
    }

    @Override
    public List<ProductImageResponseDto> getAll() {
        List<ProductImage>productImages=productImageRepository.findAll();
        List<ProductImageResponseDto>productImageResponseDtos=productImages.stream().map(productImage -> modelMapper.map(productImage,ProductImageResponseDto.class)).collect(Collectors.toList());
        return productImageResponseDtos;
    }

    @Override
    public ProductImageResponseDto update(Long id, ProductImageRequestDto dto) {
        Product product=productRepository.findById(dto.getProductId()).orElse(null);
        if(product==null){
            throw new NotFoundException("Product Bulunamadı");
        }
        ProductImage image=productImageRepository.findById(id).orElse(null);
        if(image==null){
            throw new NotFoundException("Aradığınız Veri Bulunamadı");
        }
        image.setImageUrl(dto.getImageUrl());
        image.setMainImage(dto.getMainImage());
        image.setProduct(product);
        productImageRepository.save(image);
        ProductImageResponseDto productImageResponseDto=modelMapper.map(image,ProductImageResponseDto.class);
        return productImageResponseDto;

    }

    @Override
    public boolean delete(Long id) {
        ProductImage productImage=productImageRepository.findById(id).orElse(null);
        if(productImage==null){
            throw new NotFoundException("Veri Bulunamadı");
        }
        productImageRepository.deleteById(id);
        if(!productImageRepository.existsById(id)){
            return true;
        }
        return false;
    }
}
