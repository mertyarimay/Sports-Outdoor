package Sports.Outdoor.Backend.service.brandService;

import Sports.Outdoor.Backend.dto.request.BrandRequestDto;
import Sports.Outdoor.Backend.dto.response.BrandResponseDto;
import Sports.Outdoor.Backend.entity.Brand;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.BrandRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BrandServiceImpl implements BrandService{
    private final BrandRepository brandRepository;
    private final ModelMapper modelMapper;
    @Override
    public BrandResponseDto create(BrandRequestDto dto) {
        Brand brand=modelMapper.map(dto,Brand.class);
        brandRepository.save(brand);
        BrandResponseDto brandResponseDto=modelMapper.map(brand,BrandResponseDto.class);
        return brandResponseDto;
    }

    @Override
    public BrandResponseDto getById(Long id) {
        Brand brand=brandRepository.findById(id).orElse(null);
        if(brand!=null){
            BrandResponseDto brandResponseDto=modelMapper.map(brand,BrandResponseDto.class);
            return  brandResponseDto;
        }
        throw new NotFoundException("Bu Id ye Ait Kayıt Bulunamadı");
    }

    @Override
    public List<BrandResponseDto> getAll() {
        List<Brand>brandList=brandRepository.findAll();
        List<BrandResponseDto>brandResponseDtoList=brandList.stream().map(brand -> modelMapper.map(brand,BrandResponseDto.class)).collect(Collectors.toList());
        return brandResponseDtoList;
    }

    @Override
    public BrandResponseDto update(Long id, BrandRequestDto dto) {
        Brand brand=brandRepository.findById(id).orElse(null);
        if(brand!=null){
            brand.setName(dto.getName());
            brand.setLogoUrl(dto.getLogoUrl());
            brand.setDescription(dto.getDescription());
            brandRepository.save(brand);
            BrandResponseDto brandResponseDto=modelMapper.map(brand,BrandResponseDto.class);
            return brandResponseDto;
        }
        throw new NotFoundException("Güncellemesi gereken Brand Bulunamadı");
    }

    @Override
    public Boolean delete(Long id) {
        Brand brand=brandRepository.findById(id).orElse(null);
        if(brand!=null){
            brandRepository.deleteById(id);
            if(!brandRepository.existsById(id)){
                return true;
            }
        }
        return false;
    }
}
