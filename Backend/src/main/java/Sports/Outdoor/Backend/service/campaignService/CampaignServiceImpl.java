package Sports.Outdoor.Backend.service.campaignService;

import Sports.Outdoor.Backend.dto.request.CampaignRequestDto;
import Sports.Outdoor.Backend.dto.response.CampaignResponseDto;
import Sports.Outdoor.Backend.entity.Campaign;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.CampaignRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CampaignServiceImpl implements CampaignService{
    private final ModelMapper modelMapper;
    private final CampaignRepository campaignRepository;

    @Override
    public CampaignResponseDto create(CampaignRequestDto dto) {
        Campaign campaign=modelMapper.map(dto,Campaign.class);
        campaignRepository.save(campaign);
        CampaignResponseDto campaignResponseDto=modelMapper.map(campaign,CampaignResponseDto.class);
        return campaignResponseDto;
    }

    @Override
    public CampaignResponseDto getById(Long id) {
        Campaign campaign=campaignRepository.findById(id).orElse(null);
        if(campaign!=null){
            CampaignResponseDto campaignResponseDto=modelMapper.map(campaign,CampaignResponseDto.class);
            return campaignResponseDto;
        }
        throw new NotFoundException("Aradığınız kampanya Bulunamadı");
    }

    @Override
    public List<CampaignResponseDto> getAll() {
        List<Campaign>campaigns=campaignRepository.findAll();
        List<CampaignResponseDto>campaignResponseDtos=campaigns.stream().map(campaign -> modelMapper.map(campaign,CampaignResponseDto.class)).collect(Collectors.toList());
        return campaignResponseDtos;
    }

    @Override
    public CampaignResponseDto update(Long id, CampaignRequestDto dto) {
        Campaign campaign=campaignRepository.findById(id).orElse(null);
        if(campaign!=null){
            campaign.setTitle(dto.getTitle());
            campaign.setDiscountPercent(dto.getDiscountPercent());
            campaign.setStartDate(dto.getStartDate());
            campaign.setEndDate(dto.getEndDate());
            campaignRepository.save(campaign);
            CampaignResponseDto campaignResponseDto=modelMapper.map(campaign,CampaignResponseDto.class);
            return campaignResponseDto;
        }
        throw new NotFoundException("Güncelleme İşlemi Başarısız");
    }

    @Override
    public Boolean delete(Long id) {
        Campaign campaign=campaignRepository.findById(id).orElse(null);
        if(campaign!=null){
            campaignRepository.deleteById(id);
            if(!campaignRepository.existsById(id)){
                return true;
            }
            return false;
        }
        return false;
    }
}
