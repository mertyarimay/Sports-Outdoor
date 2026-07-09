package Sports.Outdoor.Backend.dto.request;

import Sports.Outdoor.Backend.enums.PaymentMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDto {
    @NotNull(message = "Order id is required.")
    private Long orderId;

    @NotNull(message = "Payment method is required.")
    private PaymentMethod paymentMethod;

    @NotBlank(message = "Card holder name is required.")
    private String cardHolderName;

    @NotBlank(message = "Card number is required.")
    @Pattern(regexp = "^\\d{16}$", message = "Card number must contain exactly 16 digits.")
    private String cardNumber;

    @NotBlank(message = "Expiry month is required.")
    @Pattern(regexp = "^(0[1-9]|1[0-2])$", message = "Invalid expiry month.")
    private String expiryMonth;

    @NotBlank(message = "Expiry year is required.")
    @Pattern(regexp = "^\\d{2}$", message = "Invalid expiry year.")
    private String expiryYear;

    @NotBlank(message = "CVV is required.")
    @Pattern(regexp = "^\\d{3,4}$", message = "CVV must be 3 or 4 digits.")
    private String cvv;


}
