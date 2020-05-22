function moreHistogram() {
    let svgAttr = {width:1000,height:500};
    let marge = {top:60,bottom:60,left:60,right:60};
    let sales_volume_watermelon = [751273,200210,181228,143457,2811,84250,11118,10693];
    let sales_volume_orange = [35884,20852,24114,4598,48,4642,186,237];
    let monthes = ['美国', '西班牙', '意大利', '德国', '泰国', '中国', '日本', '韩国'];
 
    let svg = d3.select('#container-more').append('svg').style('width', svgAttr.width).style('height', svgAttr.height);
    let g = svg.append('g').attr('transform', 'translate('+marge.top+','+marge.left+')');
 
    //X轴比例尺
    let xScale = d3.scaleBand().domain(monthes).rangeRound([0, svgAttr.width-marge.left-marge.right]);
    let xAxis = d3.axisBottom(xScale);
    //Y轴比例尺
    let yScale = d3.scaleLinear().domain([0, d3.max(sales_volume_watermelon)]).range([svgAttr.height-marge.top-marge.bottom, 0]);
    let yAxis = d3.axisLeft(yScale);
 
    g.append('g').attr('transform', 'translate('+0+','+(svgAttr.height-marge.bottom-marge.top)+')').call(xAxis)
        .selectAll('text').attr('transform', 'rotate(45 -20 20)');
    g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
        .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
        return svgAttr.width-marge.left-marge.right;
    });
 
    let fruitType = g.append('g').attr('transform', 'translate(0,-50)');
    fruitType.append('rect').attr('width', '20px').attr('height', '20px').attr('fill', '#2C81F3');
    fruitType.append('rect').attr('transform', 'translate(100, 0)').attr('width', '20px').attr('height', '20px').attr('fill', '#DEC56C');
    fruitType.append('text').attr('transform', 'translate(25, 15)').text('确诊病列');
    fruitType.append('text').attr('transform', 'translate(125, 15)').text('死亡病列');
 
    //西瓜柱体
    let rectWidth = 30;
    let wRect = g.selectAll('.rect').data(sales_volume_watermelon).enter().append('g');
    wRect.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + 8;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;
    }).attr('fill', '#22A7F2').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#2C81F3');
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#22A7F2');
    }).on('click', function () {
        alert('西瓜事件已触发！');
    })
        .transition().duration(1000).delay(function(d,i){
        return i*100;
    })
        //.ease(d3.easeBack)
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("height",function(d){
            return svgAttr.height-marge.top-marge.bottom-yScale(d);
        });
 
    //橘子柱体
    let oRect = g.selectAll('.rect').data(sales_volume_orange).enter().append('g');
    oRect.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth + 8;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;
    }).attr('fill', '#DEC56C').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#CB7730');
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#DEC56C');
    }).on('click', function () {
        alert('橘子事件已触发！');
    })
        .transition().duration(1000).delay(function(d,i){
        return i*100;
    })
        //.ease(d3.easeBack)
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("height",function(d){
            return svgAttr.height-marge.top-marge.bottom-yScale(d);
        });
 
    //西瓜柱体顶部绘制文字
    wRect.append('text').attr('x', function (d, i) {
        return xScale(monthes[i])+rectWidth/2;
    }).attr('y', function () {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('font-size', '12px').attr('fill', '#404040')
        .text(function (d) {
            return d;
        }).transition().duration(1000).delay(function (d, i) {
        return i*100;
    })//.ease(d3.easeBack)
        .attr('x', function (d, i) {
        return xScale(monthes[i])+rectWidth/2;
    }).attr('y', function (d) {
        return yScale(d)-1;
    });
 
    //橘子柱体顶部绘制文字
    oRect.append('text').attr('x', function (d, i) {
        return xScale(monthes[i])+rectWidth*1.5;
    }).attr('y', function () {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('font-size', '12px').attr('fill', '#404040')
        .text(function (d) {
            return d;
        }).transition().duration(1000).delay(function (d, i) {
        return i*100;
    })//.ease(d3.easeBack)
        .attr('x', function (d, i) {
        return xScale(monthes[i])+rectWidth*1.5;
    }).attr('y', function (d) {
        return yScale(d)-1;
    });
}
 
window.onload = function () {
    moreHistogram();
}