const formatDate = (iso: string) => {
    if (!iso) return '-';
    const date = new Date(iso);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  export default formatDate;  