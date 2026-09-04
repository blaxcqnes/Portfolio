export default function Invoice({
  invoiceRef,
  selectedServices,
  totalPrice,
  nameValue,
}) {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const invoiceNumber = `INV${hours}${minutes}${day}${month}${year}`;

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');
  return (
    <div ref={invoiceRef} className="invoiceTemplate" id="invoiceTemplate">
      <span ref={invoiceRef} className="invoiceContent" id="invoiceTemplate">
        <p className="paymentStatus">Not Paid</p>
        <p className="invoiceDescription">Customer e-invoice copy</p>
        <div className="invoiceHeader">
          <div className="titleNameBillNoDate">
            <span className="titleName">
              <h2 className="invoiceTitle">Invoice</h2>
              <span className="nameContainer">
                <p className="nameTitle">Customer Name:</p>
                {nameValue && <p className="nameValue">{nameValue}</p>}
              </span>
            </span>
            <span className="billNoDate">
              <span className="invoiceBillNoContainer">
                <p className="invoiceBillNoTitle">Invoice No:</p>
                <p className="invoiceBillNo">{invoiceNumber}</p>
              </span>
              <span className="dateContainer">
                <p className="dateTitle">Date:</p>
                <p className="invoiceDate">{formattedDate}</p>
              </span>
            </span>
          </div>
        </div>
        {selectedServices.filter((service) => service.selected).length > 0 && (
          <div className="invoiceServices">
            {selectedServices
              .filter((service) => service.selected)
              .map((service) => (
                <div key={service.id} className="invoiceItems">
                  <div className="servicesContainer">
                    <span className="serviceNameDescription">
                      <span className="invoiceServiceName">{service.name}</span>
                      <span className="invoiceServiceDescription">
                        {service.description}
                      </span>
                    </span>
                    <span className="invoiceServicePrice">
                      ${service.price}
                    </span>
                  </div>
                  <hr />
                </div>
              ))}
            <p className="invoiceTotal">
              <span>Total:&nbsp;</span> ${totalPrice}
            </p>
          </div>
        )}
        <span className="invoiceDisclaimerContainer">
          <p className="disclaimers">
            1- Prices are estimated and may vary depending on the project
            complexity.
          </p>

          <p className="disclaimers">
            2- Your service purchase will be confirmed immediately after a
            successful payment. Please note that project scoping, designing, and
            development are subject to the terms of your approved agreement.
          </p>
        </span>
      </span>
    </div>
  );
}
