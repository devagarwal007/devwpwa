import { Chat } from '@adiwajshing/baileys';
import { PaginationParams } from '@waha/structures/pagination.dto';
import { KnexPaginator } from '@waha/utils/Paginator';

import { IChatRepository } from '../IChatRepository';
import { NOWEBSqlite3KVRepository } from './NOWEBSqlite3KVRepository';

class ChatPaginator extends KnexPaginator {
  indexes = ['id', 'conversationTimestamp'];
}

export class Sqlite3ChatRepository
  extends NOWEBSqlite3KVRepository<Chat>
  implements IChatRepository
{
  protected Paginator = ChatPaginator;

  async getAllWithMessages(pagination: PaginationParams): Promise<Chat[]> {
    // Get chats with conversationTimestamp is not Null
    let query = this.select().whereNotNull('conversationTimestamp');
    query = this.pagination(query, pagination);
    return await this.all(query);
  }
}
