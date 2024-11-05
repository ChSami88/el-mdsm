// Initialize PayPal Button
paypal.Buttons({
    createOrder: function (data, actions) {
      // Set up the transaction
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '5' // Price of Office 2021 in EUR
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      // Capture the funds from the transaction
      return actions.order.capture().then(function (details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
  
        // Trigger the file download
        downloadFile();
      });
    },
    onError: function (err) {
      console.error('Transaction Error:', err);
    }
  }).render('#paypal-button-container');
  
  // Function to download the file after successful payment
  function downloadFile() {
    // Replace FILE_URL with the URL where your Office 2021 file is hosted
    const fileUrl = 'https://drive.google.com/file/d/1j9hcLscfkApx8fDabAOMceKhkGz-4q1h/view?usp=sharing'; 
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Office2019.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  