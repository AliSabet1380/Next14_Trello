const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-full polka-dot">
      {children}
    </div>
  );
};
export default ClerkLayout;
