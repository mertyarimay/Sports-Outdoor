package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.CampaignRequestDto;
import Sports.Outdoor.Backend.dto.response.CampaignResponseDto;
import Sports.Outdoor.Backend.service.campaignService.CampaignService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/campaigns")
public class CampaignController {

    private final CampaignService campaignService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public CampaignResponseDto create(@Valid @RequestBody CampaignRequestDto dto) {
        return campaignService.create(dto);
    }

    @GetMapping("/getById/{id}")
    public CampaignResponseDto getById(@PathVariable Long id) {
        return campaignService.getById(id);
    }

    @GetMapping("/getAll")
    public List<CampaignResponseDto> getAll() {
        return campaignService.getAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public CampaignResponseDto update(@Valid @RequestBody CampaignRequestDto dto, @PathVariable Long id) {
        return campaignService.update(id, dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {

        Boolean delete = campaignService.delete(id);

        if (delete) {
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Silme İşlemi Başarısız");
    }
}
