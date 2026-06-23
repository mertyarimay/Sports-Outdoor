package Sports.Outdoor.Backend.service.productService;

import Sports.Outdoor.Backend.dto.request.ProductRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductResponseDto;
import Sports.Outdoor.Backend.entity.Brand;
import Sports.Outdoor.Backend.entity.Campaign;
import Sports.Outdoor.Backend.entity.Category;
import Sports.Outdoor.Backend.entity.Product;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.BrandRepository;
import Sports.Outdoor.Backend.repository.CampaignRepository;
import Sports.Outdoor.Backend.repository.CategoryRepository;
import Sports.Outdoor.Backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final BrandRepository brandRepository;

    private final CampaignRepository campaignRepository;

    private final ModelMapper modelMapper;
    @Override
    public ProductResponseDto create(ProductRequestDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setSlug(dto.getSlug());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setDiscountPrice(dto.getDiscountPrice());
        product.setActive(dto.getActive());
        product.setGender(dto.getGender());
        Category category=categoryRepository.findById(dto.getCategoryId()).orElse(null);
        if(category==null){
            throw new NotFoundException("Category Id Mevcut Değildir");
        }else{
            product.setCategory(category);
        }

        Brand brand=brandRepository.findById(dto.getBrandId()).orElse(null);
        if(brand==null){
            throw new NotFoundException("Brand Id Mevcut değildir");
        }else{
            product.setBrand(brand);
        }

        if(dto.getCampaignId()!=null){
            Campaign campaign=campaignRepository.findById(dto.getCampaignId()).orElse(null);
            product.setCampaign(campaign);
            }
        productRepository.save(product);

        ProductResponseDto productResponseDto=modelMapper.map(product,ProductResponseDto.class);
        return productResponseDto;
    }


    @Override
    public ProductResponseDto getById(Long id) {
        Product product=productRepository.findById(id).orElse(null);
        if(product!=null){
            ProductResponseDto productResponseDto=modelMapper.map(product,ProductResponseDto.class);
            return productResponseDto;
        }
        throw new NotFoundException("Aradığınız Product Mevcut Değildir");
    }

    @Override
    public List<ProductResponseDto> getAll() {
        List<Product>productList=productRepository.findAll();
        List<ProductResponseDto>productResponseDtos=productList.stream().map(product -> modelMapper.map(product,ProductResponseDto.class)).collect(Collectors.toList());
        return productResponseDtos;

    }

    @Override
    public ProductResponseDto update(Long id, ProductRequestDto dto) {
        Product product=productRepository.findById(id).orElse(null);
        if(product!=null){
            product.setName(dto.getName());
            product.setSlug(dto.getSlug());
            product.setDescription(dto.getDescription());
            product.setPrice(dto.getPrice());
            product.setDiscountPrice(dto.getDiscountPrice());
            product.setActive(dto.getActive());
            product.setGender(dto.getGender());
            Category category=categoryRepository.findById(dto.getCategoryId()).orElse(null);
            if(category!=null){
                product.setCategory(category);
            }
            Brand brand=brandRepository.findById(dto.getBrandId()).orElse(null);
            if(brand!=null){
                product.setBrand(brand);
            }
            if(dto.getCampaignId()!=null){
                Campaign campaign=campaignRepository.findById(dto.getCampaignId()).orElseThrow();
                product.setCampaign(campaign);
            }
            productRepository.save(product);
            ProductResponseDto productResponseDto=modelMapper.map(product,ProductResponseDto.class);
            return productResponseDto;
        }
        throw new NotFoundException("Güncellemek İstediğiniz Product Bulunamadı");

    }

    @Override
    public Boolean delete(Long id) {
        Product product=productRepository.findById(id).orElse(null);
        if(product!=null){
            productRepository.deleteById(id);
            if(!productRepository.existsById(id)){
            return true;
            }
    }
        return false;
    }
}
