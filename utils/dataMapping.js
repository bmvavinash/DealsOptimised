// utils/dataMapping.js

function mapExcelRowToProductModel(row, mappingConfig) {
    let product = {};
    for (const [modelAttr, headerNames] of Object.entries(mappingConfig)) {
        const headerNameFound = headerNames.find(header => header in row);
        if (headerNameFound) {
            product[modelAttr] = row[headerNameFound];
        }
    }
    return product;
}

// This function can then be used in excel.js to map rows of Excel data to your product model based on a dynamic mapping configuration.
