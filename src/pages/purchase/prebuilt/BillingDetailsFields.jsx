import { useAuth } from "../../../hooks/Auth";
import FormField from "./FormField";

const BillingDetailsFields = ({ price }) => {
  const auth = useAuth();
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="Jane Doe"
        required
        value={auth.userDetails.name}
        disabled={true}
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="jane.doe@example.com"
        value={auth.email}
        required
        disabled={true}
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="185 Berry St. Suite 550"
        required
        disabled={false}
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="San Francisco"
        required
        disabled={false}
      />
      <FormField
        name="state"
        label="State"
        type="text"
        placeholder="California"
        required
        disabled={false}
      />
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        placeholder="94103"
        required
        disabled={false}
      />
      <FormField
        name="value"
        label="Value"
        type="number"
        placeholder="Amount"
        required
        value={price}
        disabled={true}
      />
      <FormField
        name="currency"
        label="Currency"
        type="text"
        placeholder="USD"
        required
        value={'USD'}
        disabled={true}
      />
    </>
  );
};

export default BillingDetailsFields;
