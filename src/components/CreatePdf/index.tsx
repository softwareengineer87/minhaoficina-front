import generatePDF from 'react-to-pdf';
import type Launch from '../../models/Launch';
import { formatPrice } from '@/utils/FormatPrice';
import { PartPdf } from '../../models/Part';
import { useState } from 'react';
import './pdf.css';

interface CreatePdfProps {
  data: Launch
  partsList: PartPdf[]
  totalPrice: number
}

function CreatePdf({
  data,
  partsList,
  totalPrice,
}: CreatePdfProps) {
  const getTargetElement = () => document.getElementById('content-id');

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function changeFile(e: any) {
    if (!e.target.files) return;
    if (e.target.files) {
      const files = e.target.files;
      if (files) {
        const arrayFiles = Array.from(files);
        const urls = arrayFiles.map((file) => URL.createObjectURL(file as File));
        setPreviewImages(urls);
      }
    }
  }

  function renderFormImage() {
    return (
      <form className='forms' encType='multipart/formdata'>
        <div className='input-form'>
          <label htmlFor='file'>Fotos</label>
          <input
            onChange={changeFile}
            type='file'
            multiple
            accept='image/*'
            name='file'
            id='file'
          />
        </div>
      </form>
    );
  }

  return (
    <section>
      <div className='pdf-container' id="content-id">
        <h2>Dados da nota</h2>
        <ul>
          <li key={data.launchId}>
            {renderFormImage()}
            {previewImages.map((url, i) => (
              <img
                src={url}
                className='preview-image'
                alt='Imagem'
              />
            ))}
            <div className='infos'>
              <p>Cliente: <strong>{data.name}</strong></p>
              <p>CPF: <strong>{data.cpf}</strong></p>
              <p>Telefone: <strong>{data.tel}</strong></p>
              <p>Data do lançamento: <strong>{data.date}</strong></p>
              <p>Modelo do veiculo: <strong>{data.model}</strong></p>
              <p>Kilometragem: <strong>{data.kilometer}</strong></p>
              <p>Placa: <strong>{data.plate}</strong></p>
              <p>Observação: {data.observation}</p>
            </div>
          </li>
        </ul>
        <div className='parts-pdf'>
          <h3>peças e serviços</h3>
          <ul>
            {partsList.map((part) => (
              <li className='part-pdf' key={part.partId}>
                <p>{part.name}</p>
                <span>{formatPrice(part.price)}</span>
              </li>
            ))}
            <h5>Valor total: <strong className='text-red-700'>{formatPrice(totalPrice)}</strong></h5>
          </ul>
        </div>
      </div>
      <button className='btn-pdf' onClick={() => generatePDF(getTargetElement, { filename: 'nota.pdf' })}>Gerar PDF</button>
    </section>
  );
}

export default CreatePdf;
