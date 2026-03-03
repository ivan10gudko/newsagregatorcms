import { CustomValidator } from 'sanity'
import { API_VERSION } from '../shared/constants';

interface SourceDataValue {
    id?: string;
    name?: string;
}

export const isUniqueSource: CustomValidator<SourceDataValue | undefined> = async (value, context) => {
    if (!value || !value.id) return true;

    const { document, getClient } = context;
    const client = getClient({ apiVersion: API_VERSION});

    const docId = document?._id?.replace(/^drafts\./, '') || '';

    const query = `count(*[_type == "source" && sourceData.id == $sourceId && !(_id in [$docId, "drafts." + $docId])])`;

    const params = { sourceId: value.id, docId };
    const count = await client.fetch<number>(query, params);

    if (count > 0) {
        return `Source "${value.name}" already exists in the database! Please select another one.`;
    }

    return true;
}