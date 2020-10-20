import React from 'react';
import { Link, useParams } from 'react-router-dom';
import slugify from 'slugify';

import Trans from './Trans';

import { Product as ProductType } from '../../shared/types';

// Import all files with name matching ../*.cover.jpg pattern
require.context('../', false, /.*\.cover\.jpg$/);

export type ProductProps = {
  readonly product: ProductType;
  readonly withLink?: boolean;
};

export default function Product({
  product,
  withLink = false,
}: ProductProps): React.ReactElement {
  const { locale } = useParams<{ locale: string }>();

  return (
    <div className="Product">
      {product.coverImage ? (
        <div className="Product-cover">
          <img
            src={`/${product.coverImage}`}
            alt={product.title}
            className="Product-cover-image"
          />
        </div>
      ) : null}

      <div className="Product-infos">
        <h1 className="Product-title">
          {withLink ? (
            <Link to={`/${locale}/p/${product.slug}`}>{product.title}</Link>
          ) : (
            product.title
          )}
        </h1>
        <p className="Product-author">
          <span className="Product-author-by">
            <Trans>by</Trans>
          </span>{' '}
          <span className="Product-author-name">{product.author}</span>
        </p>
      </div>

      {product.backCoverText ? (
        <div className="Product-back-cover-text">{product.backCoverText}</div>
      ) : null}

      <div className="Product-details">
        {product.contributors
          ? product.contributors.map((contributor) => {
              const roleSlug = slugify(contributor.role, { lower: true });
              return (
                <p
                  className={`Product-detail detail-contributor role-${roleSlug}`}
                  key={contributor.name}
                >
                  <span className="detail-label">
                    <Trans>{contributor.role}</Trans>
                  </span>{' '}
                  <span className="detail-value">{contributor.name}</span>
                </p>
              );
            })
          : null}

        {product.releaseDate ? (
          <p className="Product-detail detail-page-count">
            <span className="detail-label">
              <Trans>Release date</Trans>
            </span>{' '}
            <span className="detail-value">
              {product.releaseDate.toLocaleDateString()}
            </span>
          </p>
        ) : null}

        {product.pageCount ? (
          <p className="Product-detail detail-page-count">
            <span className="detail-label">
              <Trans>Page count</Trans>
            </span>{' '}
            <span className="detail-value">{product.pageCount}</span>
          </p>
        ) : null}

        {product.price ? (
          <p className="Product-detail detail-price">
            <span className="detail-label">
              <Trans>Price</Trans>
            </span>{' '}
            <span className="detail-value">{product.price}</span>
          </p>
        ) : null}

        {product.originalLanguage ? (
          <p className="Product-detail detail-original-language">
            <span className="detail-label">
              <Trans>Original language</Trans>
            </span>{' '}
            <span className="detail-value">{product.originalLanguage}</span>
          </p>
        ) : null}

        <p className="Product-detail detail-isbn">
          <span className="detail-label">ISBN</span>{' '}
          <span className="detail-value">{product.ean}</span>
        </p>
      </div>
    </div>
  );
}