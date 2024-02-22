class InvalidItemType extends Error
{
    constructor(type)
    {
        const message  = `Invalid item type: ${type}`;
        super(message);
    }
}