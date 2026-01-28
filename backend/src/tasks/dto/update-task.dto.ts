import { IsEnum } from 'class-validator';

export class UpdateTaskStatusDto {
    @IsEnum(['OPEN', 'IN_PROGRESS', 'DONE'])
    status: string;
}
