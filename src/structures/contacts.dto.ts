import { ApiProperty } from '@nestjs/swagger';
import { PaginationParams } from '@waha/structures/pagination.dto';
import { ChatIdProperty } from '@waha/structures/properties.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { SessionBaseRequest, SessionQuery } from './base.dto';

/**
 * Queries
 */

export class ContactQuery extends SessionQuery {
  @ChatIdProperty()
  @IsString()
  contactId: string;
}

enum ContactSortField {
  ID = 'id',
  NAME = 'name',
}

export class ContactsPaginationParams extends PaginationParams {
  @ApiProperty({
    description: 'Sort by field',
    enum: ContactSortField,
  })
  @IsOptional()
  @IsEnum(ContactSortField)
  sortBy?: string;
}

/**
 * Requests
 */

export class ContactRequest extends SessionBaseRequest {
  @ChatIdProperty()
  @IsString()
  contactId: string;
}
