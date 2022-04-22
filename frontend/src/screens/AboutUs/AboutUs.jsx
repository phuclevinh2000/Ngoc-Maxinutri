import React from 'react';

import { Row, Col, Image } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Row className='p-4'>
      <Col>
        <Image src='/images/infomation.png' />
        <p className='p-3'>
          Được thành lập từ năm 2012 chỉ với một dòng sản phẩm duy nhất và độc
          quyền là Sữa chua "lắc; Và chỉ sau 5 năm hình thành và phát triển, cơ
          sở hiện tại đã phát triển các dòng sữa dinh dưỡng khác như sữa bắp,
          sữa bò tươi, sữa hạt sen, sâm nha đam. Với phương châm sản xuất "Vì
          sức khoẻ người tiêu dùng", lương tâm và trách nhiệm của người sản xuất
          thực phẩm, cùng hệ thống máy móc sản xuất vô cùng khép kin nên chúng
          tôi lựa chọn những nguyên liệu đầu vào thật tươi mới và đầy đủ tính
          pháp lý về an toàn thực phẩm để sản xuất ra những chai nước, chai sữa
          thật thơm ngon, bổ dưỡng phục vụ khách hàng.{' '}
        </p>
        <p className='p-3'>
          Chúng tôi luôn mong muốn và rất hân hạnh được phục vụ Quý khách hàng
          với sản phẩm nước và sữa dinh dưỡng Ngọc's sạch và an toàn. Chúng tôi
          luôn tin tưởng rằng : với lương tâm và lòng nhiệt huyết của chủ cơ sở
          và nhân viên cùng với hệ thống máy móc khép kín chúng tôi sẽ mang lại
          giá trị sản phẩm sữa dinh dưỡng cao nhất đáp ứng được nhu cầu và niềm
          tin của Quý khách hàng.
        </p>
      </Col>
    </Row>
  );
};

export default AboutUs;
