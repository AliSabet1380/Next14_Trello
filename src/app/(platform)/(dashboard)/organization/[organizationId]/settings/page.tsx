import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
            },
            card: {
              boxShadow: "none",
              border: "3px solid #9999ff",
            },
          },
        }}
      />
    </div>
  );
};
export default SettingsPage;
