package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.response.DashboardResponseDto;
import Sports.Outdoor.Backend.service.dashboardService.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public DashboardResponseDto getDashboard() {
        return dashboardService.getDashboard();
    }


}
