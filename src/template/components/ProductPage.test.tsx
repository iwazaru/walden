import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProductPage from './ProductPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest
    .fn()
    .mockReturnValueOnce({ slug: 'le-serpent-sur-la-butte-aux-pommes' })
    .mockReturnValueOnce({ slug: 'le-sermont-sur-le-brut-de-pomme' }),
}));

describe('ProductPage', () => {
  it('renders a ProductPage', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>,
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ProductPage"
        >
          <div
            class="Product"
          >
            <h1
              class="Product-title"
            >
              Le Serpent sur la butte aux pommes
            </h1>
            <p
              class="Product-author"
            >
              by 
              <span
                class="Product-author-name"
              >
                Gérard Ferrori
              </span>
            </p>
            <p
              class="Product-isbn"
            >
              ISBN: 
              9781234567890
            </p>
          </div>
        </div>
      </div>
    `);
  });

  it('renders a 404 page for a non-existing product', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>,
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ProductPage"
        >
          404
        </div>
      </div>
    `);
  });
});
