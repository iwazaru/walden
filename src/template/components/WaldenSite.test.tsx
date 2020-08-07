import React from 'react';
import { render } from '@testing-library/react';

import WaldenSite from './WaldenSite';

describe('Product', () => {
  it('renders a WaldenSite component', () => {
    const { container } = render(<WaldenSite />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="WaldenSite"
        >
          <header
            class="Header"
          >
            <h1
              class="Header-site-title"
            >
              Les Éditions Paronymie
            </h1>
          </header>
          <div
            class="Catalog"
          >
            <div
              class="ProductList"
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
              </div>
            </div>
          </div>
          <footer
            class="WaldenSite-powered-by"
          >
            Powered by
             
            <a
              href="https://walden.app"
              rel="noopener noreferrer"
              target="_blank"
            >
              Walden
            </a>
          </footer>
        </div>
      </div>
    `);
  });
});
