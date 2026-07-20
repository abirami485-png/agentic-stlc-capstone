const productSlugMap: Record<string, string> = {
  'Sauce Labs Backpack': 'sauce-labs-backpack',
  'Sauce Labs Bike Light': 'sauce-labs-bike-light',
  'Sauce Labs Bolt T-Shirt': 'sauce-labs-bolt-t-shirt',
  'Sauce Labs Fleece Jacket': 'sauce-labs-fleece-jacket',
  'Sauce Labs Onesie': 'sauce-labs-onesie',
  'Test.allTheThings() T-Shirt (Red)': 'test.allthethings()-t-shirt-(red)'
};

export function productActionSelector(action: 'add-to-cart' | 'remove-from-cart', productName: string): string {
  const slug = productSlugMap[productName];
  if (!slug) {
    throw new Error(`Unsupported product name: ${productName}`);
  }
  return `#${action}-${slug}`;
}
