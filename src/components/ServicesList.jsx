import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import emailjs from '@emailjs/browser';
import { services } from '../data/servicesList';
import Invoice from './Invoice';

export default function ServicesList({
  select,
  remove,
  reset,
  download,
  setActiveList,
}) {
  const [selectedServices, setSelectedServices] = useState(services);
  const [nameValue, setNameInputValue] = useState('');
  const [emailValue, setEmailInputValue] = useState('');

  const toggleSelection = (id) => {
    setSelectedServices((prev) =>
      prev.map((selection) =>
        selection.id === id
          ? { ...selection, selected: !selection.selected }
          : selection,
      ),
    );
  };

  const totalPrice = selectedServices
    .filter((service) => service.selected)
    .reduce((total, service) => total + service.price, 0);

  function resetValue() {
    setSelectedServices((prev) =>
      prev.map((selection) =>
        selection.selected
          ? { ...selection, selected: !selection.selected }
          : selection,
      ),
    );
    setNameInputValue('');
    setEmailInputValue('');
  }

  const invoiceRef = useRef(null);

  const downloadInvoice = async () => {
    const element = invoiceRef.current;

    if (!element) return;

    await document.fonts.ready;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: false,
      logging: false,
      scrollX: 0,
      scrollY: 0,

      onclone: (clonedDocument) => {
        const clonedElement = clonedDocument.getElementById('invoiceTemplate');

        if (!clonedElement) return;

        clonedElement.style.width = '900px';
        clonedElement.style.height = 'auto';
        clonedElement.style.maxHeight = 'none';
        clonedElement.style.minHeight = '0';
        clonedElement.style.position = 'fixed';
        clonedElement.style.top = '0';
        clonedElement.style.left = '0';

        clonedElement.style.overflow = 'visible';
        clonedElement.style.overflowY = 'visible';
        clonedElement.style.overflowX = 'visible';

        clonedElement.style.overscrollBehaviorY = 'auto';
        clonedElement.style.scrollbarGutter = 'unset';
        clonedElement.style.visibility = 'visible';
        clonedElement.style.pointerEvents = 'auto';
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const testImage = document.createElement('img');
    testImage.src = imgData;
    testImage.style.width = '90px';
    testImage.style.position = 'fixed';
    testImage.style.left = '0';
    testImage.style.top = '0';
    testImage.style.zIndex = '99999';

    const pdf = new jsPDF({
      unit: 'in',
      format: 'letter',
      orientation: 'portrait',
      // compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pdfWidth - 1;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0.5, 0.5, imgWidth, imgHeight);

    pdf.save('estimates.pdf');
  };

  const sendEmailEstimate = (e) => {
    e.preventDefault();

    const activeServices = selectedServices.filter(
      (service) => service.selected,
    );

    const invoiceNumber = `M-INV-${new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14)}`;

    //Email body
    const servicesListString = activeServices
      .map((service) => `- ${service.name}: $${service.price}`)
      .join('\n');

    const totalPriceEmailJs = activeServices.reduce(
      (sum, service) => sum + service.price,
      0,
    );

    const templateParams = {
      client_name: nameValue,
      client_email: emailValue,
      invoice_number: invoiceNumber,
      selected_services: servicesListString,
      total_price: `$${totalPriceEmailJs}`,
    };

    //Send via EmailJS
    emailjs
      .send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY',
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Estimate sent successfully!');
        },
        (err) => {
          console.log('FAILED...', err);
        },
      );
  };

  const handleFinalDownloadAndSubmit = async (e) => {
    e.preventDefault();

    await downloadInvoice();
    // sendEmailEstimate(e);
  };

  return (
    <main
      className="servicesList"
      id="servicesList"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="titleAndButton">
        <h4>Build Your Plan</h4>
        <button
          className="close"
          onClick={(e) => {
            e.stopPropagation();
            setActiveList(false);
          }}
        >
          Close
        </button>
      </div>
      <div className="content">
        <div className="services">
          {selectedServices.map((selectedServices) => (
            <section
              className={selectedServices.classService}
              key={selectedServices.id}
            >
              <span className={selectedServices.classServiceNameAndPrice}>
                <p className={selectedServices.classServiceName}>
                  {selectedServices.name}
                </p>
                <p className={selectedServices.classServicePrice}>
                  ${selectedServices.price}
                </p>
              </span>
              <span
                className={selectedServices.classServiceDescriptionAndButton}
              >
                <p className={selectedServices.classServiceDescription}>
                  {selectedServices.description}
                </p>
                {selectedServices.selected ? (
                  <button
                    className="remove"
                    onClick={() => toggleSelection(selectedServices.id)}
                    style={{
                      animation: 'remove 0.2s linear 1',
                      backgroundImage: `url(${remove})`,
                    }}
                    fetchPriority="high"
                  ></button>
                ) : (
                  <div
                    className="select"
                    onClick={() => toggleSelection(selectedServices.id)}
                    style={{
                      animation: 'select 0.2s linear 1',
                      backgroundImage: `url(${select})`,
                    }}
                    fetchPriority="high"
                  ></div>
                )}
              </span>
            </section>
          ))}
        </div>
        <form
          ref={invoiceRef}
          onSubmit={handleFinalDownloadAndSubmit}
          autoComplete="on"
        >
          <span className="nameLabel">
            <label
              htmlFor="name"
              className="up"
              style={{ opacity: nameValue ? 0 : 1 }}
            >
              *Required
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              className="name"
              value={nameValue}
              onChange={(e) => setNameInputValue(e.target.value)}
            />
          </span>
          <span className="emailLabel">
            <label
              htmlFor="email"
              className="up"
              style={{ opacity: emailValue ? 0 : 1 }}
            >
              *Required
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              className="email"
              value={emailValue}
              onChange={(e) => setEmailInputValue(e.target.value)}
            />
          </span>
        </form>
        <div className="disclaimerTotalResetDownload">
          <span className="disclaimer">
            <span
              className="info"
              style={{
                opacity: totalPrice && nameValue && emailValue ? '0' : '1',
                animation:
                  totalPrice && nameValue && emailValue
                    ? undefined
                    : 'infoPopup 0.2s linear 1',
                display:
                  totalPrice && nameValue && emailValue ? 'none' : undefined,
              }}
            >
              *Select at least one service and complete the required forms to
              proceed.
            </span>
            <span
              className="notice"
              style={{
                opacity: totalPrice && nameValue && emailValue ? '1' : '0',
                animation:
                  totalPrice && nameValue && emailValue
                    ? 'downloadPopup 1s linear 4'
                    : 'none',
                display:
                  !totalPrice || !nameValue || !emailValue ? 'none' : undefined,
              }}
            >
              *By clicking 'Download', an invoice detailing your chosen services
              will be generated and a duplicate copy will be forwarded to my
              end.
            </span>
            <span
              className="price"
              style={{
                animation:
                  totalPrice && nameValue && emailValue
                    ? 'priceShift 0.2s linear 1'
                    : 'priceReposition 0.2s linear 1',
              }}
            >
              *Prices are estimated and may vary depending on the project
              complexity.
            </span>
          </span>
          <div className="totalResetDownload">
            <section className="totalReset">
              <p
                className="total"
                style={{
                  opacity: totalPrice ? '1' : '0.2',
                  color: totalPrice ? '#ebebeb' : '#8b8b8b',
                }}
              >
                <span>Total:</span> ${totalPrice}
              </p>
              {totalPrice || nameValue || emailValue ? (
                <button
                  className="reset"
                  onClick={resetValue}
                  fetchPriority="high"
                  style={{
                    backgroundImage: `url(${reset})`,
                  }}
                ></button>
              ) : (
                <button
                  className="reset"
                  style={{
                    pointerEvents: 'none',
                    backgroundColor: '#232323',
                    opacity: 0.2,
                    backgroundImage: `url(${reset})`,
                  }}
                  fetchPriority="high"
                  disabled
                ></button>
              )}
            </section>
            {totalPrice && nameValue && emailValue ? (
              <button
                className="download"
                onClick={handleFinalDownloadAndSubmit}
                fetchPriority="high"
                style={{ backgroundImage: `url(${download})` }}
              ></button>
            ) : (
              <button
                className="download"
                style={{
                  pointerEvents: 'none',
                  backgroundColor: '#232323',
                  opacity: 0.2,
                  backgroundImage: `url(${download})`,
                }}
                fetchPriority="high"
                disabled
              ></button>
            )}
          </div>
        </div>
        <Invoice
          invoiceRef={invoiceRef}
          selectedServices={selectedServices}
          totalPrice={totalPrice}
          nameValue={nameValue}
        />
      </div>
    </main>
  );
}
