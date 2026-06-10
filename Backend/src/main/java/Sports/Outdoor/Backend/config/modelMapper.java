package Sports.Outdoor.Backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class modelMapper {
    @Bean
    public ModelMapper getModelMapper(){
        return new ModelMapper();
    }
}
