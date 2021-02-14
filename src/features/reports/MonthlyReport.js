import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const downloadReportVatPdf = (data) => {
  const doc = new jsPDF();

  doc.autoTable({ html: '#my-table' });

  // Or use javascript directly:
  doc.autoTable({
    head: [
      [
        'Nr kolejny wpisu',
        'Data wyjazdu/udostępnienia pojazdu',
        'Opis trasy wyjazdu (skąd-dokąd)',
        'Cel wyjazdu/udostępnienia pojazdu',
        'Liczba faktyczna przejechanych kilometrów',
        'Imię i nazwisko osoby kierującej pojazdem/osoby, której udostępniony został pojazd',
        'Stan licznika na dzień udostępnienia pojazdu',
      ],
    ],
    body: [
      ['David', 'david@example.com', 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain'],
      // ...
    ],
  });

  console.log(doc);

  const test = doc.save('table.pdf');
  console.log(doc);
  console.log(test);
};
