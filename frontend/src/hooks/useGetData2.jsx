const useGetData2 = () => {
    useGetAppliedJobs();
    const [open, setOpen] = React.useState(false);
    const { user } = useSelector((store) => store.auth);
    
    // Log the user object
    console.log('User object:', user);
  
    const profile = user?.profile || {}; 
  
    return (
      <div>
        {/* Component JSX here */}
      </div>
    );
  };
  
  export default useGetData2;