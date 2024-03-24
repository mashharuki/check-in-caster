import { fetchQuery, init } from "@airstack/node";

const getPoapBadges = async (fid: string) => {
  init(process.env.AIRSTACK_API_KEY!);

  const { data, error } = await fetchQuery(
    `query USER_POAP_COUNTRY($owner: Identity = "fc_fid:${fid}") {
              Poaps(input: {filter: {owner: {_eq: $owner}}, blockchain: ALL}) {
                Poap {
                  eventId 
                  poapEvent {
                    eventName
                    description
                    metadata 
                    isVirtualEvent
                    city
                    country
                  }
                }
              }
            }`,
  );

  const poapData = [];

  for (const poap of data.Poaps.Poap) {
    if (poap.poapEvent.isVirtualEvent === false)
      poapData.push({
        eventId: poap.eventId,
        eventName: poap.poapEvent.eventName,
        description: poap.poapEvent.description,
        image_url: poap.poapEvent.metadata.image_url,
        country: poap.poapEvent.country,
        city: poap.poapEvent.city,
      });
  }

  return poapData;
};

export { getPoapBadges };
