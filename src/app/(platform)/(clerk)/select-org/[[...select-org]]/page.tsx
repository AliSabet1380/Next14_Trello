import { OrganizationList } from "@clerk/nextjs";

const Organization = () => {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl={"/organization/:id"}
      afterSelectOrganizationUrl={"/organization/:id"}
    />
  );
};
export default Organization;
