import { IUser } from "../../../../models";
import { ThemedTextFieldDisabled } from "../../../../components";

const ProductContent = (user: IUser) => (
  <>
    <div className="mt-4 flex flex-col gap-4">
      <ThemedTextFieldDisabled disabled name="name" value={user.fullName} label="Full Name" />
      <ThemedTextFieldDisabled disabled name="email" value={user.email} label="Email" />
      <ThemedTextFieldDisabled disabled name="password" value={user.passwordHash} label="Password" />
      <ThemedTextFieldDisabled disabled name="phone" value={user.phone} label="Phone" />
      <ThemedTextFieldDisabled disabled name="dob" value={user.dob} label="Date of Birth" />
      <ThemedTextFieldDisabled disabled name="gender" value={user.gender} label="Gender" />
      <ThemedTextFieldDisabled disabled name="isAdmin" value={user.isAdmin} label="Is Admin" />
      <ThemedTextFieldDisabled disabled name="activeState" value={user.activeState} label="Active State" />
    </div>
  </>
);

export default ProductContent;
