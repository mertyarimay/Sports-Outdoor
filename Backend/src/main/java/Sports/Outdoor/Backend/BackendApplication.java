package Sports.Outdoor.Backend;

import Sports.Outdoor.Backend.exception.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@RestControllerAdvice
@SpringBootApplication
public class BackendApplication { public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
}

@ExceptionHandler
@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public ProblemDetails validationProblems(MethodArgumentNotValidException methodArgumentNotValidException){
	ValidationProblems validationProblems=new ValidationProblems();
	validationProblems.setMessage("Validation Exception");
	validationProblems.setValidationErrors(new HashMap<String,String>());
	for (FieldError fieldError:methodArgumentNotValidException.getBindingResult().getFieldErrors()){
		validationProblems.getValidationErrors().put(fieldError.getField(),fieldError.getDefaultMessage());
	}
	return validationProblems;

}
	@ExceptionHandler
	@ResponseStatus(code= HttpStatus.BAD_REQUEST)
	public ProblemDetails handleBusinessException(BusinessExcepiton businessExcepiton){
		ProblemDetails problemDetails=new ProblemDetails();
		problemDetails.setMessage(businessExcepiton.getMessage());
		return problemDetails;
	}

	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	public ProblemDetails handleNotFoundException(NotFoundException notFoundException){
		ProblemDetails problemDetails = new ProblemDetails();
		problemDetails.setMessage(notFoundException.getMessage());
		return problemDetails;
	}

	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	public ProblemDetails handleBadRequestException(BadRequestException badRequestException){
		ProblemDetails problemDetails = new ProblemDetails();
		problemDetails.setMessage(badRequestException.getMessage());
		return problemDetails;
	}

	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.FORBIDDEN)
	public ProblemDetails handleForbiddenException(ForbiddenException forbiddenException){
		ProblemDetails problemDetails = new ProblemDetails();
		problemDetails.setMessage(forbiddenException.getMessage());
		return problemDetails;
	}

}
