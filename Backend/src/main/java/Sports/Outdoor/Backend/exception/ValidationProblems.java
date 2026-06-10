package Sports.Outdoor.Backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationProblems extends ProblemDetails{
    private Map<String,String>validationErrors;
}
