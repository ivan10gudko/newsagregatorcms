import { CustomValidator } from 'sanity'
import { API_VERSION } from '../shared/constants';

export const isUniqueTopic: CustomValidator<string | undefined> = async (
    topicName,
    context
) => {
    if (!topicName) return true;

    const { document, getClient } = context;
    const client = getClient({ apiVersion: API_VERSION });

    const docId = document?._id?.replace(/^drafts\./, '') || '';

    const query = `count(*[_type == "topic" && lower(name) == lower($topicName) && !(_id in [$docId, "drafts." + $docId])])`;

    const params = {
        topicName,
        docId
    };

    const count = await client.fetch<number>(query, params);

    if (count > 0) {
        return `Topic "${topicName}" already exists!`;
    }

    return true;
}