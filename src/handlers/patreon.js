/* SOON!

exports.PatreonLoop = async (client, db) => {
    await CheckPatrons(client, db, client.patreon);
    setInterval(async () => {
        await CheckPatrons(client, db, client.patreon);
    }, 3600000);
};

async function CheckPatrons(client, db, campaign) {
    try {
        const tiers = client.config.patreon.tier;
        const curDate = new Date();
        const patrons = await campaign.fetchPatrons();

        for (const patron of patrons) {
            if (patron.discord_user_id) {
                const row = await db.get('patreon', patron.discord_user_id);
                let patronTier = null;

                switch (patron.currently_entitled_tier_id) {
                    case tiers.supporter:
                        patronTier = 'supporter';
                        break;
                    case tiers.vip:
                        patronTier = 'vip';
                        break;
                    case tiers.mvp:
                        patronTier = 'mvp';
                        break;
                    default:
                        patronTier = 'unknown';
                        break;
                }

                if (row) {
                    let data = row.value;

                    if (data.isActive && patron.patron_status === 'active_patron') {
                        const lastPayout = new Date(data?.last_payout_time);
                        const lastPayoutMonth = lastPayout.getMonth();
                        const lastPayoutYear = lastPayout.getFullYear();

                        if (lastPayoutMonth < curDate.getMonth() || lastPayoutYear < curDate.getFullYear()) {
                            const user = await client.users.fetch(patron.discord_user_id);
                            if (user) {
                                const sharedServers = client.guilds.cache.some(guild =>
                                    guild.members.cache.has(user.id),
                                );
                                if (sharedServers) {
                                    await user.send('You have a new payout available!');
                                    await db.set('patreon', patron.discord_user_id, null, {
                                        ...data,
                                        isActive: false,
                                        last_payout_time: new Date().toISOString(),
                                    });
                                }
                            }
                        }
                    } else if (!data.isActive && patron.patron_status === 'active_patron') {
                        await db.set('patreon', patron.discord_user_id, null, {
                            isActive: true,
                            last_payout_time: new Date().toISOString(),
                            tier: patronTier,
                            patron_name: patron.full_name,
                            email: patron.email,
                            patron_status: patron.patron_status,
                        });

                        const user = await client.users.fetch(patron.discord_user_id);
                        if (user) {
                            const sharedServers = client.guilds.cache.some(guild => guild.members.cache.has(user.id));
                            if (sharedServers) {
                                user.send('Welcome back! Your Patreon benefits are now active!');
                            }
                        }
                    } else {
                        await db.set('patreon', patron.discord_user_id, null, {
                            isActive: false,
                            last_payout_time: null,
                            tier: null,
                            patron_name: patron.full_name,
                            email: patron.email,
                            patron_status: patron.patron_status,
                        });
                    }
                } else {
                    await db.set('patreon', patron.discord_user_id, null, {
                        isActive: true,
                        last_payout_time: new Date().toISOString(),
                        tier: patronTier,
                        patron_name: patron.full_name,
                        email: patron.email,
                        patron_status: patron.patron_status,
                    });

                    const user = await client.users.fetch(patron.discord_user_id);
                    if (user) {
                        const sharedServers = client.guilds.cache.some(guild => guild.members.cache.has(user.id));
                        if (sharedServers) {
                            user.send('Thank you for supporting us on Patreon!');
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error in PatreonLoop:', error);
    }
}

exports.PatreonCheck = async (client, userId) => {
    await CheckPatrons(client, client.db, client.patreon);
    const data = await client.db.get('patreon', userId);
    if (!data || !data?.value?.isActive) return false;
    const curDate = new Date();
    const lastPayout = new Date(data?.last_payout_time);
    const lastPayoutMonth = lastPayout.getMonth();
    const lastPayoutYear = lastPayout.getFullYear();

    if (lastPayoutMonth < curDate.getMonth() || lastPayoutYear < curDate.getFullYear()) return false;
    return data.value;
};
*/
