import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENT_SERVICE) paymentService: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, userId: string) {
    console.log(createReservationDto);
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }
  async findAll() {
    return this.reservationRepository.find({});
  }
  async findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
