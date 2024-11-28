import { Chat, Contact, makeInMemoryStore, proto } from '@adiwajshing/baileys';
import { Label } from '@adiwajshing/baileys/lib/Types/Label';
import { BadRequestException } from '@nestjs/common';
import { GetChatMessagesFilter } from '@waha/structures/chats.dto';
import { PaginationParams } from '@waha/structures/pagination.dto';

import { INowebStore } from './INowebStore';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require('pino')();

export class NowebInMemoryStore implements INowebStore {
  private store: ReturnType<typeof makeInMemoryStore>;
  errorMessage =
    'Enable NOWEB store "config.noweb.store.enabled=True" and "config.noweb.store.full_sync=True" when starting a new session. ' +
    'Read more: https://waha.devlike.pro/docs/engines/noweb#store';

  constructor() {
    this.store = makeInMemoryStore({ logger: logger });
  }

  init(): Promise<void> {
    return;
  }

  close(): Promise<void> {
    return;
  }

  get presences() {
    return this.store.presences;
  }

  bind(ev: any, socket: any) {
    this.store.bind(ev);
  }

  loadMessage(jid: string, id: string): Promise<proto.IWebMessageInfo> {
    return this.store.loadMessage(jid, id);
  }

  getMessagesByJid(
    chatId: string,
    filter: GetChatMessagesFilter,
    pagination: PaginationParams,
  ): Promise<any> {
    throw new BadRequestException(this.errorMessage);
  }

  getMessageById(chatId: string, messageId: string): Promise<any> {
    throw new BadRequestException(this.errorMessage);
  }

  getChats(pagination: PaginationParams): Promise<Chat[]> {
    throw new BadRequestException(this.errorMessage);
  }

  getContacts(pagination: PaginationParams): Promise<Contact[]> {
    throw new BadRequestException(this.errorMessage);
  }

  getContactById(jid: string): Promise<Contact> {
    throw new BadRequestException(this.errorMessage);
  }

  getLabels(): Promise<Label[]> {
    throw new BadRequestException(this.errorMessage);
  }

  getLabelById(labelId: string): Promise<Label | null> {
    throw new BadRequestException(this.errorMessage);
  }

  getChatsByLabelId(labelId: string): Promise<Chat[]> {
    throw new BadRequestException(this.errorMessage);
  }

  getChatLabels(chatId: string): Promise<Label[]> {
    throw new BadRequestException(this.errorMessage);
  }
}
