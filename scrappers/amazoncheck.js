// Assuming utils and amazonConfig are imported correctly

async function extractAttribute(driver, attributeConfig) {
    for (let config of attributeConfig) {
        try {
            const element = await driver.findElement(By.xpath(config.selector));
            // Determine the attribute to extract based on config. Default to "innerHTML".
            const attributeToExtract = config.attribute || "innerHTML";
            let rawValue = await element.getAttribute(attributeToExtract);

            if (config.validator) {
                const validationResult = config.validator(rawValue);
                if (!validationResult.isValid) {
                    console.log("Validation failed for:", config.selector);
                    continue; // Skip to the next selector if validation fails
                }
                return validationResult.value; // Use modified value if validation passes
            }

            return rawValue; // Return raw value if no validator is provided
        } catch (error) {
            console.log("Error finding element or validating:", config.selector, error);
        }
    }

    console.log("All xpaths failed or validation failed for all xpaths.");
    return null; // Return null or a default value if all attempts fail
}
