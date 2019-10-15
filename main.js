
const C = (0 << 0), //Carry Bit
      Z = (1 << 1), //Zero
      I = (1 << 2), //Disable Intrupts
      D = (1 << 3), //Decimal Mode
      B = (1 << 4), //Break
      U = (1 << 5), //Unsed
      V = (1 << 6), //Overflow
      N = (1 << 7), //Negative


let lookup = [
  { opcode:  "BRK", cycles: 7 },{ opcode:  "ORA", cycles: 6 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 3 },{ opcode:  "ORA", cycles: 3 },{ opcode:  "ASL", cycles: 5 },{ opcode:  "???", cycles: 5 },{ opcode:  "PHP", cycles: 3 },{ opcode:  "ORA", cycles: 2 },{ opcode:  "ASL", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 4 },{ opcode:  "ORA", cycles: 4 },{ opcode:  "ASL", cycles: 6 },{ opcode:  "???", cycles: 6 },
   { opcode:  "BPL", cycles: 2 },{ opcode:  "ORA", cycles: 5 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 4 },{ opcode:  "ORA", cycles: 4 },{ opcode:  "ASL", cycles: 6 },{ opcode:  "???", cycles: 6 },{ opcode:  "CLC", cycles: 2 },{ opcode:  "ORA", cycles: 4 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 7 },{ opcode:  "???", cycles: 4 },{ opcode:  "ORA", cycles: 4 },{ opcode:  "ASL", cycles: 7 },{ opcode:  "???", cycles: 7 },
   { opcode:  "JSR", cycles: 6 },{ opcode:  "AND", cycles: 6 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "BIT", cycles: 3 },{ opcode:  "AND", cycles: 3 },{ opcode:  "ROL", cycles: 5 },{ opcode:  "???", cycles: 5 },{ opcode:  "PLP", cycles: 4 },{ opcode:  "AND", cycles: 2 },{ opcode:  "ROL", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "BIT", cycles: 4 },{ opcode:  "AND", cycles: 4 },{ opcode:  "ROL", cycles: 6 },{ opcode:  "???", cycles: 6 },
   { opcode:  "BMI", cycles: 2 },{ opcode:  "AND", cycles: 5 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 4 },{ opcode:  "AND", cycles: 4 },{ opcode:  "ROL", cycles: 6 },{ opcode:  "???", cycles: 6 },{ opcode:  "SEC", cycles: 2 },{ opcode:  "AND", cycles: 4 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 7 },{ opcode:  "???", cycles: 4 },{ opcode:  "AND", cycles: 4 },{ opcode:  "ROL", cycles: 7 },{ opcode:  "???", cycles: 7 },
   { opcode:  "RTI", cycles: 6 },{ opcode:  "EOR", cycles: 6 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 3 },{ opcode:  "EOR", cycles: 3 },{ opcode:  "LSR", cycles: 5 },{ opcode:  "???", cycles: 5 },{ opcode:  "PHA", cycles: 3 },{ opcode:  "EOR", cycles: 2 },{ opcode:  "LSR", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "JMP", cycles: 3 },{ opcode:  "EOR", cycles: 4 },{ opcode:  "LSR", cycles: 6 },{ opcode:  "???", cycles: 6 },
   { opcode:  "BVC", cycles: 2 },{ opcode:  "EOR", cycles: 5 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 4 },{ opcode:  "EOR", cycles: 4 },{ opcode:  "LSR", cycles: 6 },{ opcode:  "???", cycles: 6 },{ opcode:  "CLI", cycles: 2 },{ opcode:  "EOR", cycles: 4 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 7 },{ opcode:  "???", cycles: 4 },{ opcode:  "EOR", cycles: 4 },{ opcode:  "LSR", cycles: 7 },{ opcode:  "???", cycles: 7 },
   { opcode:  "RTS", cycles: 6 },{ opcode:  "ADC", cycles: 6 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 3 },{ opcode:  "ADC", cycles: 3 },{ opcode:  "ROR", cycles: 5 },{ opcode:  "???", cycles: 5 },{ opcode:  "PLA", cycles: 4 },{ opcode:  "ADC", cycles: 2 },{ opcode:  "ROR", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "JMP", cycles: 5 },{ opcode:  "ADC", cycles: 4 },{ opcode:  "ROR", cycles: 6 },{ opcode:  "???", cycles: 6 },
   { opcode:  "BVS", cycles: 2 },{ opcode:  "ADC", cycles: 5 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 4 },{ opcode:  "ADC", cycles: 4 },{ opcode:  "ROR", cycles: 6 },{ opcode:  "???", cycles: 6 },{ opcode:  "SEI", cycles: 2 },{ opcode:  "ADC", cycles: 4 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 7 },{ opcode:  "???", cycles: 4 },{ opcode:  "ADC", cycles: 4 },{ opcode:  "ROR", cycles: 7 },{ opcode:  "???", cycles: 7 },
   { opcode:  "???", cycles: 2 },{ opcode:  "STA", cycles: 6 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 6 },{ opcode:  "STY", cycles: 3 },{ opcode:  "STA", cycles: 3 },{ opcode:  "STX", cycles: 3 },{ opcode:  "???", cycles: 3 },{ opcode:  "DEY", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "TXA", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "STY", cycles: 4 },{ opcode:  "STA", cycles: 4 },{ opcode:  "STX", cycles: 4 },{ opcode:  "???", cycles: 4 },
   { opcode:  "BCC", cycles: 2 },{ opcode:  "STA", cycles: 6 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 6 },{ opcode:  "STY", cycles: 4 },{ opcode:  "STA", cycles: 4 },{ opcode:  "STX", cycles: 4 },{ opcode:  "???", cycles: 4 },{ opcode:  "TYA", cycles: 2 },{ opcode:  "STA", cycles: 5 },{ opcode:  "TXS", cycles: 2 },{ opcode:  "???", cycles: 5 },{ opcode:  "???", cycles: 5 },{ opcode:  "STA", cycles: 5 },{ opcode:  "???", cycles: 5 },{ opcode:  "???", cycles: 5 },
   { opcode:  "LDY", cycles: 2 },{ opcode:  "LDA", cycles: 6 },{ opcode:  "LDX", cycles: 2 },{ opcode:  "???", cycles: 6 },{ opcode:  "LDY", cycles: 3 },{ opcode:  "LDA", cycles: 3 },{ opcode:  "LDX", cycles: 3 },{ opcode:  "???", cycles: 3 },{ opcode:  "TAY", cycles: 2 },{ opcode:  "LDA", cycles: 2 },{ opcode:  "TAX", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "LDY", cycles: 4 },{ opcode:  "LDA", cycles: 4 },{ opcode:  "LDX", cycles: 4 },{ opcode:  "???", cycles: 4 },
   { opcode:  "BCS", cycles: 2 },{ opcode:  "LDA", cycles: 5 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 5 },{ opcode:  "LDY", cycles: 4 },{ opcode:  "LDA", cycles: 4 },{ opcode:  "LDX", cycles: 4 },{ opcode:  "???", cycles: 4 },{ opcode:  "CLV", cycles: 2 },{ opcode:  "LDA", cycles: 4 },{ opcode:  "TSX", cycles: 2 },{ opcode:  "???", cycles: 4 },{ opcode:  "LDY", cycles: 4 },{ opcode:  "LDA", cycles: 4 },{ opcode:  "LDX", cycles: 4 },{ opcode:  "???", cycles: 4 },
   { opcode:  "CPY", cycles: 2 },{ opcode:  "CMP", cycles: 6 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "CPY", cycles: 3 },{ opcode:  "CMP", cycles: 3 },{ opcode:  "DEC", cycles: 5 },{ opcode:  "???", cycles: 5 },{ opcode:  "INY", cycles: 2 },{ opcode:  "CMP", cycles: 2 },{ opcode:  "DEX", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "CPY", cycles: 4 },{ opcode:  "CMP", cycles: 4 },{ opcode:  "DEC", cycles: 6 },{ opcode:  "???", cycles: 6 },
   { opcode:  "BNE", cycles: 2 },{ opcode:  "CMP", cycles: 5 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 4 },{ opcode:  "CMP", cycles: 4 },{ opcode:  "DEC", cycles: 6 },{ opcode:  "???", cycles: 6 },{ opcode:  "CLD", cycles: 2 },{ opcode:  "CMP", cycles: 4 },{ opcode:  "NOP", cycles: 2 },{ opcode:  "???", cycles: 7 },{ opcode:  "???", cycles: 4 },{ opcode:  "CMP", cycles: 4 },{ opcode:  "DEC", cycles: 7 },{ opcode:  "???", cycles: 7 },
   { opcode:  "CPX", cycles: 2 },{ opcode:  "SBC", cycles: 6 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "CPX", cycles: 3 },{ opcode:  "SBC", cycles: 3 },{ opcode:  "INC", cycles: 5 },{ opcode:  "???", cycles: 5 },{ opcode:  "INX", cycles: 2 },{ opcode:  "SBC", cycles: 2 },{ opcode:  "NOP", cycles: 2 },{ opcode:  "???", cycles: 2 },{ opcode:  "CPX", cycles: 4 },{ opcode:  "SBC", cycles: 4 },{ opcode:  "INC", cycles: 6 },{ opcode:  "???", cycles: 6 },
   { opcode:  "BEQ", cycles: 2 },{ opcode:  "SBC", cycles: 5 },{ opcode:  "???", cycles: 2 },{ opcode:  "???", cycles: 8 },{ opcode:  "???", cycles: 4 },{ opcode:  "SBC", cycles: 4 },{ opcode:  "INC", cycles: 6 },{ opcode:  "???", cycles: 6 },{ opcode:  "SED", cycles: 2 },{ opcode:  "SBC", cycles: 4 },{ opcode:  "NOP", cycles: 2 },{ opcode:  "???", cycles: 7 },{ opcode:  "???", cycles: 4 },{ opcode:  "SBC", cycles: 4 },{ opcode:  "INC", cycles: 7 },{ opcode:  "???", cycles: 7 },
	]

class Bus{
  constructor(){
      this.ram = []
    //init ram and clear it
      for(let i = 0x0000; i <= 0xffff; i += 0x001){
        this.ram[i] = 0
      }
    }

  write(addr, data){
    if( addr >= 0x0000 && addr <= 0xffff){
      this.ram[addr] = data;
    }
  };

  read(addr, flag){
    if( addr >= 0x0000 && addr <= 0xffff){
      return this.ram[addr];
   }else{
      return 0x00
    }
  };

}

class Cpu{
  constructor(){
    this.bus = new Bus();

    this.status = 0x00;
    this.a = 0x00;
    this.x = 0x00;
    this.y = 0x00;
    this.stkp = 0x00;
    this.pc = 0x00;
    this.status = 0x00;

    this.fetched = 0x00;
    this.addr_abs = 0x0000;
    this.addr_rel = 0x00;
    this.opcode = 0x00;
    this.cycles = 0;


  }

  getFlag(flag){
      return (this.status & f > 0) ? 1 : 0;
  }
  setFlag(flag, value){

  }
  clock(){
    if(this.cycles == 0){
      this.opcode = read(this.pc);
      this.pc += 0x01;

      //get starting number of cycles;
      this.cycles = lookup[this.opcode].cycles

      // let add_cycle1 = call(lookup[this.opcode].addrmode)
      // let add_cycle2 = call(lookup[this.opcode].addrmode)

      // this.cycles += add_cycle1 + add_cycle2

      this.setFlag(U , true);
    }
    cycles--;
  }
  reset(){


    this.addr_abs = 0xFFFC;
    let lo = this.bus.read(this.addr_abs + 0);
    let hi = this.bus.read(this.addr_abs + 1);

    this.pc = (hi << 8) | lo;

    this.a = 0x00;
    this.x = 0x00;
    this.y = 0x00;
    this.stkp = 0xFD;
    this.status = 0x00 | U;

    this.addr_rel = 0x0000;
    this.addr_abs = 0x0000;
    this.fetched = 0x00;

    this.cycles = 8;



  }
  irq(){
    if(getFlag(I) == 0){

      this.bus.write(0x0100 + this.stkp, (this.pc >> 8) & 0x00FF);
      this.stkp -= 0x01;
      this.bus.write(0x0100 + this.stkp, this.pc & 0x00FF);
      this.stkp -= 0x01;

      this.setFlag(B, 0);
      this.setFlag(U, 1);
      this.setFlag(I, 1);
      this.bus.write(0x0100 + this.stkp, status);
      this.stkp -= 0x01;

      this.addr_abs = 0xFFFE;
      let lo = this.bus.read(this.addr_abs + 0);
      let hi = this.bus.read(this.addr_abs + 1);
      this.pc = (hi << 8) | lo;

      this.cycles = 7;

    }
  }
  nmi(){
    this.bus.write(0x0100 + this.stkp, (this.pc >> 8) & 0x00FF);
    this.stkp -= 0x01;
    this.bus.write(0x0100 + this.stkp, this.pc & 0x00FF);
    this.stkp -= 0x01;

    this.setFlag(B, 0);
    this.setFlag(U, 1);
    this.setFlag(I, 1);
    this.bus.write(0x0100 + this.stkp, status);
    this.stkp -= 0x01;

    this.addr_abs = 0xFFFE;
    let lo = this.bus.read(this.addr_abs + 0);
    let hi = this.bus.read(this.addr_abs + 1);
    this.pc = (hi << 8) | lo;

    this.cycles = 8;
  }

  fetch(){

  }

  //addressing modes

  IMP(){
    this.fetched = this.a;
    return 0
  }

  IMM(){
    this.addr_abs = this.pc += 0x01;
    return 0
  }

  ZP0(){
  	this.addr_abs = this.bus.read(this.pc);
  	this.pc += 0x01;
  	this.addr_abs &= 0x00FF;
  	return 0;
  }

  ZPX(){
  	this.addr_abs = (this.bus.read(this.pc) + this.x);
  	this.pc++;
  	this.addr_abs &= 0x00FF;
  	return 0;
  }

  ZPY(){
  	this.addr_abs = (this.bus.read(this.pc) + this.y);
  	this.pc++;
  	this.addr_abs &= 0x00FF;
  	return 0;
  }

  ABS(){
  	let lo = this.bus.read(this.pc);
  	this.pc += 0x01;
  	let hi = this.bus.read(this.pc);
  	this.pc += 0x01;

  	this.addr_abs = (hi << 8) | lo;

  	return 0;
  }

  ABX(){
  	let lo = read(pc);
  	this.pc += 0x01;
  	let hi = read(pc);
  	this.pc += 0x01;

  	this.addr_abs = (hi << 8) | lo;
  	this.addr_abs += this.x;

  	if ((this.addr_abs & 0xFF00) != (hi << 8))
  		return 1;
  	else
  		return 0;
  }

  ABY(){
    let lo = read(pc);
    this.pc += 0x01;
    let hi = read(pc);
    this.pc += 0x01;

    this.addr_abs = (hi << 8) | lo;
    this.addr_abs += this.y;

    if ((this.addr_abs & 0xFF00) != (hi << 8))
      return 1;
    else
      return 0;
  }

  IND(){
  	let ptr_lo = this.bus.read(this.pc);
  	this.pc += 0x01;
  	let ptr_hi = this.bus.read(this.pc);
  	this.pc += 0x01;

  	let ptr = (ptr_hi << 8) | ptr_lo;

  	if (ptr_lo == 0x00FF) // Simulate page boundary hardware bug
  	{
  		this.addr_abs = (this.bus.read(ptr & 0xFF00) << 8) | this.bus.read(ptr + 0);
  	}
  	else // Behave normally
  	{
  		this.addr_abs = (this.bus.read(ptr + 1) << 8) | this.bus.read(ptr + 0);
  	}

  	return 0;
  }

  IZX(){
  	let t = this.bus.read(this.pc);
  	this.pc += 0x01;

  	let lo = this.bus.read((t + this.x) & 0x00FF);
  	let hi = this.bus.read((t + this.x + 1) & 0x00FF);

  	this.addr_abs = (hi << 8) | lo;

  	return 0;
  }

  IZY(){
  	let t = this.bus.read(this.pc);
  	this.pc += 0x01;

  	let lo = this.bus.read(t & 0x00FF);
  	let hi = this.bus.read((t + 1) & 0x00FF);

  	this.addr_abs = (hi << 8) | lo;
  	this.addr_abs += this.y;

  	if ((this.addr_abs & 0xFF00) != (hi << 8))
  		return 1;
  	else
  		return 0;
  }

  REL(){
  	this.addr_rel = this.bus.read(this.pc);
  	this.pc += 0x01;
  	if (this.addr_rel & 0x80)
  		this.addr_rel |= 0xFF00;
  	return 0;
  }

  //instructions

  AND(){
    this.fetch();
    a = a & this.fetched;
    this.setFlag(Z, this.a == 0x00);
    this.setFlag(N, this.a & 0x80);

    return 1;
  }

  BCC(){
    if (this.getFlag(C) == 0){
      this.cycles += 0x01;
      this.addr_abs = this.pc + this.addr_rel;

      if((this.addr_abs & 0xFF00) != (this.pc & 0xFF00)){
        this.cycles += 0x01;
      }

      this.pc = this.addr_abs;

    }
    return 0;
  }

  BCS(){
    if (this.getFlag(C) == 1){
      this.cycles += 0x01;
      this.addr_abs = this.pc + this.addr_rel;

      if((this.addr_abs & 0xFF00) != (this.pc & 0xFF00)){
        this.cycles += 0x01;
      }

      this.pc = this.addr_abs;

    }
    return 0;
  }

  BEQ(){
    if (this.getFlag(Z) == 1){
      this.cycles += 0x01;
      this.addr_abs = this.pc + this.addr_rel;

      if((this.addr_abs & 0xFF00) != (this.pc & 0xFF00)){
        this.cycles += 0x01;
      }

      this.pc = this.addr_abs;

    }
    return 0;
  }

  BNE(){
    if (this.getFlag(Z) == 0){
      this.cycles += 0x01;
      this.addr_abs = this.pc + this.addr_rel;

      if((this.addr_abs & 0xFF00) != (this.pc & 0xFF00)){
        this.cycles += 0x01;
      }

      this.pc = this.addr_abs;

    }
    return 0;
  }

  BMI(){
    if (this.getFlag(N) == 1){
      this.cycles += 0x01;
      this.addr_abs = this.pc + this.addr_rel;

      if((this.addr_abs & 0xFF00) != (this.pc & 0xFF00)){
        this.cycles += 0x01;
      }

      this.pc = this.addr_abs;

    }
    return 0;
  }

  BPL(){
    if (this.getFlag(N) == 0){
      this.cycles += 0x01;
      this.addr_abs = this.pc + this.addr_rel;

      if((this.addr_abs & 0xFF00) != (this.pc & 0xFF00)){
        this.cycles += 0x01;
      }

      this.pc = this.addr_abs;

    }
    return 0;
  }

  BVC(){
    if (this.getFlag(V) == 0){
      this.cycles += 0x01;
      this.addr_abs = this.pc + this.addr_rel;

      if((this.addr_abs & 0xFF00) != (this.pc & 0xFF00)){
        this.cycles += 0x01;
      }

      this.pc = this.addr_abs;

    }
    return 0;
  }

  BVS(){
    if (this.getFlag(V) == 1){
      this.cycles += 0x01;
      this.addr_abs = this.pc + this.addr_rel;

      if((this.addr_abs & 0xFF00) != (this.pc & 0xFF00)){
        this.cycles += 0x01;
      }

      this.pc = this.addr_abs;

    }
    return 0;
  }

  CLC(){
    this.setFlag(C, false);
    return 0;
  }

  CLD(){
    this.setFlag(D, false);
    return 0;
  }

  CLI(){
    this.setFlag(I, false);
    return 0;
  }

  CLV(){
    this.setFlag(V, false);
    return 0;
  }

  ADC(){
    this.fetch()
    let temp =  this.a + this.fetched + this.getFlag(C);
    this.setFlag(C, temp > 255);
    this.setFlag(Z, (temp & 0x00FF) == 0);
    this.setFlag(V, (this.a ^ this.fetched) & (this.a ^ temp & 0x0080));
    this.setFlag(N, temp & 0x80);
    this.a = temp & 0x00FF;

    return 1;
  }

  SBC(){
      this.fetch();

      let value = (this.fetched ^ 0x00FF);
      let temp = this.a + value + this.getFlag(C);

      this.setFlag(C, temp & 0xFF00);
      this.setFlag(Z, (temp & 0x00FF) == 0);
      this.setFlag(V, (temp ^ this.a) & (temp ^ value) & 0x0080);
      this.setFlag(N, temp & 0x0080);
      this.a = temp & 0x00FF;

      return 1;
  }

  PHA(){
    this.bus.write(0x0100 + this.stkp, this.a)
    this.stkp -= 0x01;
    return 0;
  }

  PLA(){
    this.stkp += 0x01;
    this.a = this.bus.read(0x0100 + this.stkp);
    this.setFlag(Z, a == 0x00);
    this.setFlag(N, a & 0x80);
    return 0;
  }


}

let epicCpu = new Cpu()
