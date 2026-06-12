package Sports.Outdoor.Backend.service.campaignService;

import Sports.Outdoor.Backend.dto.request.CampaignRequestDto;
import Sports.Outdoor.Backend.dto.response.CampaignResponseDto;

import java.util.List;

public interface CampaignService {
    CampaignResponseDto create(CampaignRequestDto dto);

    CampaignResponseDto getById(Long id);

    List<CampaignResponseDto> getAll();

    CampaignResponseDto update(Long id, CampaignRequestDto dto);

    Boolean delete(Long id);
}
