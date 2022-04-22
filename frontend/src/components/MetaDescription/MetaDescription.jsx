import React from 'react';
import { Helmet } from 'react-helmet';

const MetaDescription = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

MetaDescription.defaultProps = {
  title: 'Ngoc MaxiNutri',
  keywords: 'Thực phẩm giải khát có lợi cho sức khỏe người tiêu dùng',
  description: 'Công Ty trách nhiệm hữu hạn một thành viên Ngọc',
};

export default MetaDescription;
