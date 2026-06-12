package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.CampaignRequestDto;
import Sports.Outdoor.Backend.dto.response.CampaignResponseDto;
import Sports.Outdoor.Backend.service.campaignService.CampaignService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/campaigns")
public class CampaignController {
    private final CampaignService campaignService;

    @PostMapping("/create")
    public CampaignResponseDto create(@Valid @RequestBody CampaignRequestDto dto){
        CampaignResponseDto campaignResponseDto=campaignService.create(dto);
        return campaignResponseDto;
    }

    @GetMapping("/getById/{id}")
    public CampaignResponseDto getById(@PathVariable Long id){
        CampaignResponseDto campaignResponseDto=campaignService.getById(id);
        return campaignResponseDto;
    }

    @GetMapping("/getAll")
    public List<CampaignResponseDto>getAll(){
        List<CampaignResponseDto>campaignResponseDtos=campaignService.getAll();
        return campaignResponseDtos;
    }
    @PutMapping("/update/{id}")
    public CampaignResponseDto update(@Valid @RequestBody CampaignRequestDto dto,@PathVariable Long id){
        CampaignResponseDto campaignResponseDto=campaignService.update(id,dto);
        return campaignResponseDto;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object>delete(@PathVariable Long id){
        Boolean delete=campaignService.delete(id);
        if(delete==true){
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Silme İşlemi Başarısız");
    }
}
